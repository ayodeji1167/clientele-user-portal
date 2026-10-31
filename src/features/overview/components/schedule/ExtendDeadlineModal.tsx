import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { AppModal } from "@/components/common";
import {
  DateInput,
  FormField,
  SelectInput,
  SwitchRow,
  TextArea,
  TextInput,
} from "@/components/input";
import { fieldError } from "@/utils/form";
import {
  useExtendDeadlineMutation,
  useGetPortalMilestonesQuery,
} from "../../api";
import type { Deadline } from "../../interface";
import { extendDeadlineSchema, todayIsoDate } from "../../utils/validation";

function formatDayMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB");
}

/** Keeps the original time of day when moving a deadline to a new date. */
function withTimeOf(date: string, iso: string) {
  const original = new Date(iso);
  const [year, month, day] = date.split("-").map(Number);
  return new Date(
    year,
    month - 1,
    day,
    original.getHours(),
    original.getMinutes(),
  ).toISOString();
}

type ExtendDeadlineModalProps = {
  deadline: Deadline;
  onClose: () => void;
};

export function ExtendDeadlineModal({
  deadline,
  onClose,
}: ExtendDeadlineModalProps) {
  const { data: milestones = [deadline.milestone] } =
    useGetPortalMilestonesQuery(deadline.portalId);
  const extend = useExtendDeadlineMutation();

  const formik = useFormik({
    initialValues: {
      milestoneId: deadline.milestone.id,
      newDeadline: "",
      reason: "",
      notifyClient: false,
    },
    validationSchema: extendDeadlineSchema,
    onSubmit: (values) => {
      const milestone = milestones.find((m) => m.id === values.milestoneId);
      if (!milestone) return;
      extend.mutate(
        {
          deadlineId: deadline.id,
          milestoneId: milestone.id,
          newDeadline: withTimeOf(values.newDeadline, milestone.dueAt),
          reason: values.reason.trim() || undefined,
          notifyClient: values.notifyClient,
        },
        { onSuccess: onClose },
      );
    },
  });

  const selected = milestones.find((m) => m.id === formik.values.milestoneId);

  return (
    <AppModal
      open
      onClose={onClose}
      title="Extend deadline"
      description="Select a new date to submit this deliverable."
      onSubmit={formik.submitForm}
      footer={
        <>
          <Button variant="tertiary" w="5rem" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" w="10.0625rem" loading={extend.isPending}>
            Extend
          </Button>
        </>
      }
    >
      <Stack gap="0.75rem">
        <FormField
          label="Milestone"
          required
          error={fieldError(formik, "milestoneId")}
        >
          <SelectInput
            name="milestoneId"
            portalled={false}
            options={milestones.map((m) => ({ label: m.name, value: m.id }))}
            value={formik.values.milestoneId}
            onChange={(value) => formik.setFieldValue("milestoneId", value)}
          />
        </FormField>

        <SimpleGrid columns={2} gap="0.75rem">
          <FormField label="Current deadline" required disabled>
            <TextInput
              h="2.5rem"
              value={selected ? formatDayMonthYear(selected.dueAt) : ""}
              readOnly
            />
          </FormField>
          <FormField
            label="New deadline"
            required
            error={fieldError(formik, "newDeadline")}
          >
            <DateInput
              name="newDeadline"
              portalled={false}
              min={todayIsoDate()}
              value={formik.values.newDeadline}
              onChange={(value) => formik.setFieldValue("newDeadline", value)}
            />
          </FormField>
        </SimpleGrid>

        <FormField
          label="Reason for extension"
          optional
          error={fieldError(formik, "reason")}
        >
          <TextArea
            placeholder="e.g. I have an unavoidable conflict"
            {...formik.getFieldProps("reason")}
          />
        </FormField>

        <Stack pt="0.375rem">
          <SwitchRow
            name="notifyClient"
            label="Notify the client"
            checked={formik.values.notifyClient}
            onChange={(checked) =>
              formik.setFieldValue("notifyClient", checked)
            }
          />
        </Stack>
      </Stack>
    </AppModal>
  );
}

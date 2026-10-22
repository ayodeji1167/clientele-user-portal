import {
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AppModal } from "@/components/common";
import {
  DateInput,
  FormField,
  SelectInput,
  SwitchRow,
  TextInput,
} from "@/components/input";
import { fieldSurface } from "@/components/input/styles";
import { fieldError } from "@/utils/form";
import { useRescheduleMeetingMutation } from "../../api";
import type { Meeting } from "../../interface";
import { rescheduleMeetingSchema, todayIsoDate } from "../../utils/validation";

const DURATIONS = [
  { label: "30 mins", value: "30" },
  { label: "45 mins", value: "45" },
  { label: "1 hour", value: "60" },
  { label: "1h 30mins", value: "90" },
];

// Fixed slots until the calendar API provides real availability.
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const MEET_PREFIX = "https://meet.google.com/";

function slotLabel(slot: string) {
  const [hour, minute] = slot.split(":").map(Number);
  const suffix = hour < 12 ? "AM" : "PM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")}${suffix}`;
}

function toIso(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute).toISOString();
}

type RescheduleMeetingModalProps = {
  meeting: Meeting;
  onClose: () => void;
};

export function RescheduleMeetingModal({
  meeting,
  onClose,
}: RescheduleMeetingModalProps) {
  const reschedule = useRescheduleMeetingMutation();
  const linkPrefix = meeting.link.startsWith(MEET_PREFIX) ? MEET_PREFIX : "";

  const formik = useFormik({
    initialValues: {
      title: meeting.title,
      date: "",
      durationMinutes: String(meeting.durationMinutes),
      time: "",
      linkCode: meeting.link.slice(linkPrefix.length),
      sendInvite: false,
    },
    validationSchema: rescheduleMeetingSchema,
    onSubmit: (values) =>
      reschedule.mutate(
        {
          meetingId: meeting.id,
          title: values.title.trim(),
          startsAt: toIso(values.date, values.time),
          durationMinutes: Number(values.durationMinutes),
          link: linkPrefix + values.linkCode.trim(),
          sendInvite: values.sendInvite,
        },
        { onSuccess: onClose },
      ),
  });

  const timeError = fieldError(formik, "time");
  const linkError = fieldError(formik, "linkCode");

  return (
    <AppModal
      open
      onClose={onClose}
      title="Reschedule meeting"
      description="We’ll notify your client that you’re unable to join the meeting at the initially agreed time."
      onSubmit={formik.submitForm}
      footer={
        <>
          <Button variant="tertiary" w="5rem" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" w="10.0625rem" loading={reschedule.isPending}>
            Reschedule
          </Button>
        </>
      }
    >
      <Stack gap="0.75rem">
        <FormField label="Title" required error={fieldError(formik, "title")}>
          <TextInput h="2.5rem" {...formik.getFieldProps("title")} />
        </FormField>

        <SimpleGrid columns={2} gap="0.75rem">
          <FormField
            label="New date"
            required
            error={fieldError(formik, "date")}
          >
            <DateInput
              name="date"
              portalled={false}
              min={todayIsoDate()}
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("date", value)}
            />
          </FormField>
          <FormField
            label="Duration"
            required
            error={fieldError(formik, "durationMinutes")}
          >
            <SelectInput
              name="durationMinutes"
              portalled={false}
              options={DURATIONS}
              value={formik.values.durationMinutes}
              onChange={(value) =>
                formik.setFieldValue("durationMinutes", value)
              }
            />
          </FormField>
        </SimpleGrid>

        <FormField label="Available times" required error={timeError}>
          <SimpleGrid
            role="radiogroup"
            aria-label="Available times"
            columns={4}
            gap="0.3125rem"
            w="full"
          >
            {TIME_SLOTS.map((slot) => {
              const selected = formik.values.time === slot;
              return (
                <chakra.button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => formik.setFieldValue("time", slot)}
                  h="2.5rem"
                  borderWidth="0.0625rem"
                  borderRadius="0.5rem"
                  textStyle="p3"
                  cursor="pointer"
                  borderColor={selected ? "sandal.700" : "border.primary"}
                  bg={selected ? "sandal.50" : "bg.secondary"}
                  color={selected ? "sandal.700" : "text.muted"}
                  fontWeight={selected ? "500" : "400"}
                  _hover={{
                    borderColor: selected ? "sandal.700" : "neutral.300",
                  }}
                  _focusVisible={{
                    outline: "none",
                    boxShadow: "ring.focusNeutral",
                  }}
                >
                  {slotLabel(slot)}
                </chakra.button>
              );
            })}
          </SimpleGrid>
        </FormField>

        <FormField label="Meeting link" required error={linkError}>
          <Flex
            align="center"
            w="full"
            h="2.5rem"
            px="0.75rem"
            css={fieldSurface}
            data-invalid={linkError ? "" : undefined}
            _focusWithin={{ boxShadow: "ring.focusNeutral" }}
          >
            {linkPrefix && (
              <Text as="span" color="text.muted" flexShrink={0} pe="0.375rem">
                {linkPrefix}
              </Text>
            )}
            <chakra.input
              {...formik.getFieldProps("linkCode")}
              aria-label="Meeting link"
              flex="1"
              minW="0"
              h="full"
              bg="transparent"
              outline="none"
              color="text.primary"
              textStyle="p2"
            />
          </Flex>
        </FormField>

        <Stack pt="0.375rem">
          <SwitchRow
            name="sendInvite"
            label="Send revised invite to client"
            checked={formik.values.sendInvite}
            onChange={(checked) => formik.setFieldValue("sendInvite", checked)}
          />
        </Stack>
      </Stack>
    </AppModal>
  );
}

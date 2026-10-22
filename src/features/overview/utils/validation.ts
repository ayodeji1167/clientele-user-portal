import * as yup from "yup";

/** Today as "YYYY-MM-DD" in local time, for comparing with picked dates. */
export function todayIsoDate() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const extendDeadlineSchema = yup.object({
  milestoneId: yup.string().required("Choose a milestone"),
  newDeadline: yup
    .string()
    .required("Pick a new deadline")
    .test("future", "Pick a date after today", (value) =>
      value ? value > todayIsoDate() : true,
    ),
  reason: yup.string().max(500, "Keep the reason under 500 characters"),
  notifyClient: yup.boolean(),
});

export const rescheduleMeetingSchema = yup.object({
  title: yup.string().trim().required("Give the meeting a title"),
  date: yup
    .string()
    .required("Pick a date")
    .test("not-past", "Pick today or a later date", (value) =>
      value ? value >= todayIsoDate() : true,
    ),
  durationMinutes: yup.number().required("Choose a duration"),
  time: yup.string().required("Choose a time"),
  linkCode: yup.string().trim().required("Add the meeting link"),
  sendInvite: yup.boolean(),
});

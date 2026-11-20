import { reportPetInfo } from "../lib/api";

type ReportData = {
  name: string;
  phone: string;
  where: string;
};

export function useReportPetInfo() {
  async function sendReport(petId: string, data: ReportData) {
    await reportPetInfo(petId, data);
  }

  return { sendReport };
}
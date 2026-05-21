export interface Department {
  id: string;
  name: string;
  shortName: string;
  head: string;
  totalAssigned: number;
  resolved: number;
  pending: number;
  avgResolutionDays: number;
  color: string;
  icon: string;
  satisfactionScore: number;
}

export const mockDepartments: Department[] = [
  { id: "D001", name: "Roads & Infrastructure", shortName: "Roads", head: "Robert Hayes", totalAssigned: 342, resolved: 289, pending: 53, avgResolutionDays: 4.2, color: "#f59e0b", icon: "Construction", satisfactionScore: 88 },
  { id: "D002", name: "Sanitation & Waste", shortName: "Sanitation", head: "Maria Santos", totalAssigned: 218, resolved: 201, pending: 17, avgResolutionDays: 1.8, color: "#10b981", icon: "Trash2", satisfactionScore: 93 },
  { id: "D003", name: "Water & Utilities", shortName: "Water", head: "James Okafor", totalAssigned: 156, resolved: 128, pending: 28, avgResolutionDays: 3.1, color: "#3b82f6", icon: "Droplets", satisfactionScore: 84 },
  { id: "D004", name: "Traffic Engineering", shortName: "Traffic", head: "Linda Park", totalAssigned: 134, resolved: 119, pending: 15, avgResolutionDays: 2.5, color: "#f97316", icon: "Traffic", satisfactionScore: 91 },
  { id: "D005", name: "Parks & Recreation", shortName: "Parks", head: "David Chen", totalAssigned: 98, resolved: 82, pending: 16, avgResolutionDays: 5.7, color: "#22c55e", icon: "Trees", satisfactionScore: 87 },
  { id: "D006", name: "Public Works", shortName: "Pub. Works", head: "Sandra Nguyen", totalAssigned: 187, resolved: 158, pending: 29, avgResolutionDays: 3.9, color: "#8b5cf6", icon: "Wrench", satisfactionScore: 82 },
  { id: "D007", name: "Code Enforcement", shortName: "Code Enf.", head: "Michael Torres", totalAssigned: 112, resolved: 97, pending: 15, avgResolutionDays: 6.3, color: "#ec4899", icon: "Shield", satisfactionScore: 79 },
];

export const monthlyResolutionData = [
  { month: "Jun '25", reports: 142, resolved: 118, target: 130 },
  { month: "Jul '25", reports: 156, resolved: 134, target: 135 },
  { month: "Aug '25", reports: 189, resolved: 165, target: 140 },
  { month: "Sep '25", reports: 167, resolved: 148, target: 145 },
  { month: "Oct '25", reports: 145, resolved: 131, target: 140 },
  { month: "Nov '25", reports: 132, resolved: 122, target: 135 },
  { month: "Dec '25", reports: 108, resolved: 101, target: 130 },
  { month: "Jan '26", reports: 124, resolved: 113, target: 135 },
  { month: "Feb '26", reports: 138, resolved: 127, target: 140 },
  { month: "Mar '26", reports: 162, resolved: 149, target: 145 },
  { month: "Apr '26", reports: 178, resolved: 163, target: 150 },
  { month: "May '26", reports: 191, resolved: 174, target: 155 },
];

export const districtIssueData = [
  { district: "Downtown", issues: 287, resolved: 241, density: 94 },
  { district: "Westside", issues: 198, resolved: 167, density: 72 },
  { district: "Midtown", issues: 243, resolved: 210, density: 85 },
  { district: "Northgate", issues: 156, resolved: 133, density: 61 },
  { district: "Eastpark", issues: 134, resolved: 118, density: 58 },
  { district: "Harbor", issues: 178, resolved: 152, density: 67 },
  { district: "Riverside", issues: 112, resolved: 98, density: 44 },
  { district: "Industrial", issues: 89, resolved: 71, density: 38 },
];

export const categoryBreakdownData = [
  { name: "Potholes/Roads", value: 28, color: "#f59e0b" },
  { name: "Streetlights", value: 16, color: "#8b5cf6" },
  { name: "Garbage", value: 19, color: "#ef4444" },
  { name: "Water/Sewer", value: 14, color: "#3b82f6" },
  { name: "Traffic", value: 11, color: "#f97316" },
  { name: "Parks", value: 8, color: "#10b981" },
  { name: "Other", value: 4, color: "#6b7280" },
];

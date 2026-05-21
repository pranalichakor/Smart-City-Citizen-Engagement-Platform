export interface Poll {
  question: string;
  options: { label: string; votes: number }[];
  totalVotes: number;
  userVoted?: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  tags: string[];
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
  isTrending: boolean;
  poll?: Poll;
}

export const forumCategories = [
  "All", "Infrastructure", "Safety", "Environment", "Events", "Suggestions", "General",
];

export const trendingTopics = [
  { tag: "#WaterMainRepairs", count: 234 },
  { tag: "#UrbanGreenery2026", count: 187 },
  { tag: "#SmartTrafficLights", count: 156 },
  { tag: "#CommunityGarden", count: 134 },
  { tag: "#PotholeSeason", count: 121 },
  { tag: "#ParkRenovation", count: 98 },
  { tag: "#NightSafety", count: 87 },
  { tag: "#BikelanesNow", count: 76 },
];

export const mockForumPosts: ForumPost[] = [
  {
    id: "F001",
    title: "The new traffic light AI system is actually working — data from this week",
    content: "I've been tracking intersection wait times for the past 3 weeks and the new AI signal management system has reduced my morning commute by about 8 minutes. Anyone else noticing improvements on their routes? Would love to aggregate community data.",
    author: "Marcus Chen",
    authorAvatar: "https://picsum.photos/seed/u2/100/100",
    date: "2026-05-19",
    category: "Infrastructure",
    tags: ["traffic", "AI", "commute", "SmartTrafficLights"],
    upvotes: 156,
    comments: 42,
    isUpvoted: false,
    isTrending: true,
  },
  {
    id: "F002",
    title: "POLL: Should we prioritize the Riverside flood mitigation or the Northgate road expansion?",
    content: "The city has announced limited budget for infrastructure this fiscal year and is seeking community input on prioritization. Both projects have been in the pipeline for 2+ years. Cast your vote below.",
    author: "Elena Rodriguez",
    authorAvatar: "https://picsum.photos/seed/u3/100/100",
    date: "2026-05-18",
    category: "Infrastructure",
    tags: ["infrastructure", "budget", "community", "voting"],
    upvotes: 243,
    comments: 87,
    isUpvoted: true,
    isTrending: true,
    poll: {
      question: "Which infrastructure project should be prioritized?",
      options: [
        { label: "Riverside Flood Mitigation System", votes: 312 },
        { label: "Northgate Road Expansion Project", votes: 198 },
        { label: "Downtown Pedestrian Upgrades", votes: 145 },
        { label: "Fund all partially, delay timelines", votes: 89 },
      ],
      totalVotes: 744,
      userVoted: 0,
    },
  },
  {
    id: "F003",
    title: "Unofficial guide to using UrbanPulse effectively — tips from a 2-year power user",
    content: "After 142 reports and hundreds of forum interactions, I've learned a few tricks that dramatically improve response times and report quality. Sharing my full guide here for the community.",
    author: "Alex Chen",
    authorAvatar: "https://picsum.photos/seed/uc/100/100",
    date: "2026-05-17",
    category: "General",
    tags: ["tips", "guide", "UrbanPulse", "community"],
    upvotes: 389,
    comments: 63,
    isUpvoted: false,
    isTrending: true,
  },
  {
    id: "F004",
    title: "Westside park renovation — can we get an update from the Parks Dept?",
    content: "The proposed renovation was announced 8 months ago and ground has not been broken. Multiple attempts to get updates through official channels have been unresponsive. Hoping someone from the department sees this.",
    author: "Aisha Williams",
    authorAvatar: "https://picsum.photos/seed/u7/100/100",
    date: "2026-05-16",
    category: "Environment",
    tags: ["parks", "Westside", "accountability", "ParkRenovation"],
    upvotes: 178,
    comments: 54,
    isUpvoted: false,
    isTrending: false,
  },
  {
    id: "F005",
    title: "Night safety audit — documenting poorly lit streets across the city",
    content: "I'm compiling a crowdsourced map of poorly lit streets and dangerous areas. Please reply with your location and observations. We'll submit a formal request with the compiled data.",
    author: "Priya Sharma",
    authorAvatar: "https://picsum.photos/seed/u5/100/100",
    date: "2026-05-15",
    category: "Safety",
    tags: ["safety", "streetlights", "NightSafety", "community-mapping"],
    upvotes: 267,
    comments: 91,
    isUpvoted: true,
    isTrending: true,
  },
  {
    id: "F006",
    title: "POLL: What should replace the old industrial warehouse site?",
    content: "The city has purchased the abandoned Crane & Sons warehouse on Harbor Blvd. Public comments are open until June 1st. This is your chance to shape what gets built there.",
    author: "James Okafor",
    authorAvatar: "https://picsum.photos/seed/u4/100/100",
    date: "2026-05-14",
    category: "Suggestions",
    tags: ["development", "Harbor", "zoning", "community-input"],
    upvotes: 312,
    comments: 124,
    isUpvoted: false,
    isTrending: true,
    poll: {
      question: "What should replace the warehouse on Harbor Blvd?",
      options: [
        { label: "Community recreation center", votes: 445 },
        { label: "Mixed-use residential + retail", votes: 287 },
        { label: "Urban farm and green space", votes: 389 },
        { label: "Arts and culture hub", votes: 213 },
        { label: "Let the market decide (sell to developer)", votes: 67 },
      ],
      totalVotes: 1401,
      userVoted: 2,
    },
  },
  {
    id: "F007",
    title: "Proposed bike lane expansion map — community feedback requested",
    content: "The Transportation Department has shared a draft map of proposed new bike lanes. I'm collecting community feedback before the official comment period closes on May 30th.",
    author: "David Kim",
    authorAvatar: "https://picsum.photos/seed/u6/100/100",
    date: "2026-05-13",
    category: "Infrastructure",
    tags: ["bikes", "BikelanesNow", "transportation", "green-transit"],
    upvotes: 198,
    comments: 67,
    isUpvoted: false,
    isTrending: false,
  },
  {
    id: "F008",
    title: "Downtown Spring Cleanup — volunteer coordination thread",
    content: "Official thread for volunteers signed up to the May 25th cleanup. Please comment your preferred zone assignment. We'll coordinate tool distribution and meetup points here.",
    author: "Sarah Johnson",
    authorAvatar: "https://picsum.photos/seed/u1/100/100",
    date: "2026-05-12",
    category: "Events",
    tags: ["volunteer", "cleanup", "Downtown", "community"],
    upvotes: 134,
    comments: 89,
    isUpvoted: true,
    isTrending: false,
  },
];

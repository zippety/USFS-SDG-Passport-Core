export const mockTeamRoles = [
    {
        id: 1,
        title: "Co-Presidents",
        assignee: "Lilia, Adrian, & Jane",
        focus: "Overall Strategy, Backlog Management, SSF Funding",
        tasks: ["Approve Weekly Sprint", "Secure Phase 2 Budget", "Leadership Alignment"]
    },
    {
        id: 2,
        title: "SDG Creative Director",
        assignee: "DJ",
        focus: "Vision, Funding Strategy, & 'Mega Bonk' Execution",
        tasks: ["Film Demo Video", "Design Pet Assets", "Pitch to SenecaAI"]
    },
    {
        id: 3,
        title: "Social Media Director",
        assignee: "Jolly",
        focus: "Content Calendar, Instagram, & Digital Engagement",
        tasks: ["Post 'Name the Pet' Story", "Film Event Teasers", "Monitor DM's"]
    },
    {
        id: 4,
        title: "Event Director",
        assignee: "Ruqaiya",
        focus: "Logistics, Venue Booking, & On-the-ground Ops",
        tasks: ["Book Main Hall for Nov 20", "Order Event Catering", "Create Run-of-Show"]
    },
    {
        id: 5,
        title: "Marketing Director",
        assignee: "Rena",
        focus: "Brand Consistency, Physical Posters, & Outreach",
        tasks: ["Design Frost Week Flyer", "TikTok Content Strategy", "Booth Setup Plan"]
    },
    {
        id: 6,
        title: "Research Director",
        assignee: "Shannon",
        focus: "Campus Env. Challenges, Grant Metrics, & AASHE Reporting",
        tasks: ["Research Campus Challenges", "Develop Sustain. Proposals", "Coordinate Research Timeline"]
    }
];

export const mockImpactStats = [
    { label: "Total Students", value: "450", change: "+12%", icon: "Users" },
    { label: "Stamps Collected", value: "1,240", change: "+85 this week", icon: "CheckCircle" },
    { label: "Top SDG Interest", value: "#13 Climate", change: "Trending", icon: "TrendingUp" },
    { label: "Grant Status", value: "Qualified", change: "Ready for funding", icon: "DollarSign" }
];

export const mockRoadmap = {
    todo: [
        { id: 1, title: "Sign SSF Grant Paperwork", tag: "Lilia", color: "bg-indigo-100 text-indigo-800" },
        { id: 2, title: "Confirm Catering for Feb 13", tag: "Ruqaiya", color: "bg-blue-100 text-blue-800" },
        { id: 3, title: "Analyze 'Climate' Interest Data", tag: "Shannon", color: "bg-yellow-100 text-yellow-800" },
        { id: 9, title: "Print 500 QR Code Stickers", tag: "Rena", color: "bg-orange-100 text-orange-800" },
        { id: 12, title: "Marketing Meeting (Career Ladder)", tag: "Rena", date: "Dec 22", color: "bg-pink-100 text-pink-800" },
        { id: 13, title: "Newsletter Sync", tag: "Shannon", date: "Dec 22", color: "bg-yellow-100 text-yellow-800" }
    ],
    inProgress: [
        { id: 4, title: "Edit 'Zero to App' Demo Video", tag: "DJ", color: "bg-purple-100 text-purple-800" },
        { id: 5, title: "Design 'Club Fair' Banner", tag: "Rena", color: "bg-orange-100 text-orange-800" },
        { id: 8, title: "Post 'Meet the Team' Reel", tag: "Jolly", color: "bg-green-100 text-green-800" },
        { id: 10, title: "Book Room S2030 (Mixer)", tag: "Ruqaiya", color: "bg-blue-100 text-blue-800" }
    ],
    done: [
        { id: 6, title: "Approve Phase 1 Strategy", tag: "Adrian", color: "bg-indigo-100 text-indigo-800" },
        { id: 7, title: "Launch Dark Mode", tag: "DJ", color: "bg-purple-100 text-purple-800" },
        { id: 11, title: "Create Instagram Account", tag: "Jolly", color: "bg-green-100 text-green-800" }
    ]
};

export const strategyLinks = [
    { id: 1, title: "The Hidden Giant Strategy", url: "#", icon: "Brain" },
    { id: 2, title: "Visual Prompts & Scripts", url: "#", icon: "Image" },
    { id: 3, title: "Public Leadership Protocol", url: "#", icon: "Shield" }
];

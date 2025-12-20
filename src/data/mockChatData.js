export const mockChannels = [
    { id: 1, name: 'general', type: 'public', unread: 0 },
    { id: 2, name: 'exec-team', type: 'private', unread: 3 },
    { id: 3, name: 'event-logistics', type: 'public', unread: 5 },
    { id: 4, name: 'social-media', type: 'public', unread: 1 }
];

export const mockMessages = [
    {
        id: 1,
        channelId: 2,
        user: "Lilia (Co-Prez)",
        avatar: "👩🏻",
        text: "Just signed the SSF Grant paperwork! We are officially funded for Phase 1! 🚀",
        timestamp: "9:15 AM",
        isMe: false
    },
    {
        id: 2,
        channelId: 2,
        user: "Ruqaiya",
        avatar: "🧕🏽",
        text: "Amazing!! I just confirmed the room for the Feb 13th mixer. Catering is next on my list.",
        timestamp: "9:20 AM",
        isMe: false
    },
    {
        id: 3,
        channelId: 2,
        user: "You",
        avatar: "👤",
        text: "Great work! I'm finishing the demo video edit right now. The dashboard looks sick.",
        timestamp: "9:25 AM",
        isMe: true
    },
    {
        id: 4,
        channelId: 2,
        user: "Jolly",
        avatar: "🤳",
        text: "Wait till you see the reel I made. The 'Sustainability Pet' is going to go viral.",
        timestamp: "9:28 AM",
        isMe: false
    },
    {
        id: 5,
        channelId: 2,
        user: "Rena",
        avatar: "🎨",
        text: "I'll print the QR stickers for the booth tonight. We are READY.",
        timestamp: "9:45 AM",
        isMe: false
    },
    {
        id: 6,
        channelId: 2,
        user: "Shannon",
        avatar: "🧪",
        text: "I've drafted the 'Campus Challenges' survey. Sending it to you guys for the pilot next week!",
        timestamp: "9:50 AM",
        isMe: false
    },
    {
        id: 7,
        channelId: 2,
        user: "DJ (Creative Director)",
        avatar: "🎯",
        text: "Hey team! 🌱 Quick question — right now the working title is 'SDG Passport.' It's functional, but maybe a bit dry. Before we launch the pilot with Enactus/CafeTO, do you guys want to keep that name, or brainstorm something with more 'USFS Vibe'?",
        timestamp: "10:15 AM",
        isMe: true
    },
    {
        id: 8,
        channelId: 2,
        user: "DJ (Creative Director)",
        avatar: "🎯",
        text: "Some seeds to get us started: 'Sprout' (matches our mascot!), 'ImpactTrack', 'LeafUp', 'GreenStamp'... but I want to hear YOUR ideas! What feels right for USFS? 🌱",
        timestamp: "10:18 AM",
        isMe: true
    },
    {
        id: 9,
        channelId: 1,
        user: "Global Bot",
        avatar: "🤖",
        text: "Welcome to the USFS General Channel! 🌍 This is where all club members hang out. Post your sustainability wins here!",
        timestamp: "Today",
        isMe: false
    },
    {
        id: 10,
        channelId: 3,
        user: "Events Admin",
        avatar: "📅",
        text: "Logistics check: Jan 20th Booth is confirmed for Building A. We need 2 volunteers for the morning shift!",
        timestamp: "Yesterday",
        isMe: false
    },
    {
        id: 11,
        channelId: 4,
        user: "Social Core",
        avatar: "📱",
        text: "Drafting the 'How to Scan' tutorial for Instagram. Does anyone have a high-res shot of the QR Table Tents?",
        timestamp: "Monday",
        isMe: false
    }
];

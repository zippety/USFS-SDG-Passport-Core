// All 17 SDG stamps with available actions
export const mockStamps = [
  {
    sdgNumber: 1,
    name: "No Poverty",
    actions: [
      { id: 1, description: "Donate to food bank", points: 15, verified: false },
      { id: 2, description: "Attend poverty awareness workshop", points: 25, verified: false },
    ]
  },
  {
    sdgNumber: 2,
    name: "Zero Hunger",
    actions: [
      { id: 3, description: "Share local food bank post", points: 10, verified: true },
      { id: 4, description: "Volunteer at campus food drive", points: 30, verified: false },
    ]
  },
  {
    sdgNumber: 3,
    name: "Good Health and Well-being",
    actions: [
      { id: 5, description: "Attend mental health workshop", points: 20, verified: false },
      { id: 6, description: "Join fitness challenge", points: 15, verified: false },
      { id: 35, description: "🛌 Use Sleep Timer (7+ hrs tracked)", points: 10, verified: false },
    ]
  },
  {
    sdgNumber: 4,
    name: "Quality Education",
    actions: [
      { id: 7, description: "Check out sustainability book", points: 15, verified: false },
      { id: 8, description: "Attend SDG education session", points: 25, verified: false },
    ]
  },
  {
    sdgNumber: 5,
    name: "Gender Equality",
    actions: [
      { id: 9, description: "Attend gender equality talk", points: 25, verified: false },
      { id: 10, description: "Join women in tech event", points: 30, verified: false },
    ]
  },
  {
    sdgNumber: 6,
    name: "Clean Water and Sanitation",
    actions: [
      { id: 11, description: "Refill water bottle", points: 10, verified: true },
      { id: 12, description: "Attend water conservation talk", points: 25, verified: false },
    ]
  },
  {
    sdgNumber: 7,
    name: "Affordable and Clean Energy",
    actions: [
      { id: 13, description: "Use stairs instead of elevator", points: 5, verified: false },
      { id: 14, description: "Attend energy efficiency workshop", points: 20, verified: false },
    ]
  },
  {
    sdgNumber: 8,
    name: "Decent Work and Economic Growth",
    actions: [
      { id: 15, description: "Attend career fair", points: 15, verified: false },
      { id: 16, description: "Join networking event", points: 20, verified: false },
    ]
  },
  {
    sdgNumber: 9,
    name: "Industry, Innovation and Infrastructure",
    actions: [
      { id: 17, description: "Attend innovation hackathon", points: 40, verified: false },
      { id: 18, description: "Join tech innovation talk", points: 25, verified: false },
    ]
  },
  {
    sdgNumber: 10,
    name: "Reduced Inequalities",
    actions: [
      { id: 19, description: "Attend diversity workshop", points: 25, verified: false },
      { id: 20, description: "Join cultural celebration", points: 20, verified: false },
    ]
  },
  {
    sdgNumber: 11,
    name: "Sustainable Cities and Communities",
    actions: [
      { id: 21, description: "Join bike-to-campus week", points: 30, verified: false },
      { id: 22, description: "Use public transit", points: 10, verified: false },
    ]
  },
  {
    sdgNumber: 12,
    name: "Responsible Consumption and Production",
    partner: "Responsible Cafes TO",
    actions: [
      { id: 23, description: "☕ Use reusable cup at Responsible Cafes partner", points: 20, verified: true, partner: "Responsible Cafes TO", estimatedTime: "5 mins" },
      { id: 24, description: "Bring reusable container to cafeteria", points: 15, verified: false, estimatedTime: "5 mins" },
      { id: 25, description: "Attend sustainability fair", points: 25, verified: false, estimatedTime: "1 hour" },
    ]
  },
  {
    sdgNumber: 13,
    name: "Climate Action",
    prerequisites: [12],
    actions: [
      { id: 25, description: "Attend climate action rally", points: 30, verified: true, estimatedTime: "2 hours" },
      { id: 26, description: "Join tree planting event", points: 35, verified: false, estimatedTime: "3 hours" },
    ]
  },
  {
    sdgNumber: 14,
    name: "Life Below Water",
    prerequisites: [6, 13],
    actions: [
      { id: 27, description: "Attend ocean conservation talk", points: 25, verified: false, estimatedTime: "45 mins" },
      { id: 28, description: "Join beach cleanup", points: 40, verified: false, estimatedTime: "4 hours" },
    ]
  },
  {
    sdgNumber: 15,
    name: "Life on Land",
    actions: [
      { id: 29, description: "Join campus garden project", points: 30, verified: false },
      { id: 30, description: "Attend biodiversity workshop", points: 25, verified: false },
    ]
  },
  {
    sdgNumber: 16,
    name: "Peace, Justice and Strong Institutions",
    actions: [
      { id: 31, description: "Attend human rights discussion", points: 25, verified: false },
      { id: 32, description: "Join conflict resolution workshop", points: 30, verified: false },
    ]
  },
  {
    sdgNumber: 17,
    name: "Partnerships for the Goals",
    actions: [
      { id: 33, description: "Attend club event", points: 20, verified: true },
      { id: 34, description: "Join partnership networking", points: 25, verified: false },
    ]
  },
];


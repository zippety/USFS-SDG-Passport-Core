import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { getSDGColor, getSDGIcon } from '../utils/sdgData';

export default function EventsCalendar() {
    const navigate = useNavigate();
    const [events, setEvents] = useState(mockEvents);
    const [bookedEvents, setBookedEvents] = useState([]);

    const handleBookEvent = (eventId) => {
        if (!bookedEvents.includes(eventId)) {
            setBookedEvents([...bookedEvents, eventId]);
            // Update local state to show spot taken (visually only for demo)
            setEvents(events.map(ev =>
                ev.id === eventId ? { ...ev, spotsTaken: ev.spotsTaken + 1 } : ev
            ));
            alert("✅ Event Booked! Add it to your calendar.");
        }
    };

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group by Month Year
    const groupedEvents = new Map();
    sortedEvents.forEach(event => {
        const date = new Date(event.date);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!groupedEvents.has(monthYear)) {
            groupedEvents.set(monthYear, []);
        }
        groupedEvents.get(monthYear).push(event);
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900 pb-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <button
                    onClick={() => navigate('/')}
                    className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Passport</span>
                </button>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Event Calendar</h1>
                        <p className="text-gray-600 dark:text-gray-300">Book workshops & earn stamps</p>
                    </div>
                </div>

                <div className="space-y-10">
                    {Array.from(groupedEvents.entries()).map(([month, monthEvents]) => (
                        <div key={month} className="animate-fade-in-up">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                                <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                                {month}
                            </h2>
                            <div className="space-y-4">
                                {monthEvents.map((event) => {
                                    const isBooked = bookedEvents.includes(event.id);
                                    const color = getSDGColor(event.sdg);

                                    return (
                                        <div
                                            key={event.id}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {/* Date Column */}
                                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 flex flex-col items-center justify-center md:w-32 md:border-r border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                    </span>
                                                    <span className="text-3xl font-extrabold text-gray-800 dark:text-white">
                                                        {new Date(event.date).getDate()}
                                                    </span>
                                                    <span className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                                                        {event.time.split(' - ')[0]}
                                                    </span>
                                                </div>

                                                {/* Content Column */}
                                                <div className="p-6 flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center space-x-2">
                                                            {/* Event Type Badge */}
                                                            {event.type === 'hosted' ? (
                                                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-bold uppercase border border-green-200 dark:border-green-800">
                                                                    Official Host
                                                                </span>
                                                            ) : (
                                                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold uppercase border border-blue-200 dark:border-blue-800">
                                                                    Team Trip
                                                                </span>
                                                            )}

                                                            <span
                                                                className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold text-white"
                                                                style={{ backgroundColor: color }}
                                                            >
                                                                {getSDGIcon(event.sdg)}
                                                                <span>SDG {event.sdg}</span>
                                                            </span>
                                                        </div>

                                                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                            <Users className="w-4 h-4 mr-1" />
                                                            {event.spots - event.spotsTaken} spots left
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                        {event.image} {event.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                                        {event.description}
                                                    </p>

                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                                                        <MapPin className="w-4 h-4 mr-1 text-red-500" />
                                                        {event.location}
                                                    </div>

                                                    {isBooked ? (
                                                        <button
                                                            disabled
                                                            className="w-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 cursor-default"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                            <span>Booked • See you there!</span>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleBookEvent(event.id)}
                                                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                                                        >
                                                            <Calendar className="w-4 h-4" />
                                                            <span>Book Now</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

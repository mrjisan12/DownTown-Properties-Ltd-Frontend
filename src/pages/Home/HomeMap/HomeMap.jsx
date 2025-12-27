import React from 'react';

const HomeMap = ({ google_map_embed, loading }) => {
    console.log(google_map_embed);
    return (
        <div>
            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-16 h-16 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 animate-spin shadow-md" />
                    <p className="mt-3 text-gray-600">Loading map...</p>
                </div>
            ) : (
                <div className="w-full h-96">
                    <iframe
                        src={google_map_embed}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default HomeMap;
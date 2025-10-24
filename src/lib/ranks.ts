
export type Rank = {
    level: number;
    minWins: number;
    maxWins: number;
    name: string;
    class: 'Anfänger' | 'Fortgeschritten' | 'Profi' | 'Legende';
    icon: 'CircleDot' | 'Gauge' | 'Flame' | 'Crown' | 'SteeringWheel'; // SteeringWheel for legacy
};

export const ranks: Rank[] = [
    // Klasse 1 (Anfänger) - SteeringWheel/CircleDot
    { level: 1, minWins: 0, maxWins: 10, name: "Fahrschüler", class: "Anfänger", icon: "CircleDot" },
    { level: 2, minWins: 11, maxWins: 25, name: "Anfänger", class: "Anfänger", icon: "CircleDot" },
    { level: 3, minWins: 26, maxWins: 50, name: "Straßenneuling", class: "Anfänger", icon: "CircleDot" },
    { level: 4, minWins: 51, maxWins: 100, name: "Fahrassistent", class: "Anfänger", icon: "CircleDot" },
    { level: 5, minWins: 101, maxWins: 200, name: "Fahrprofi", class: "Anfänger", icon: "CircleDot" },

    // Klasse 2 (Fortgeschritten) - Gauge
    { level: 6, minWins: 201, maxWins: 350, name: "Drift Rookie", class: "Fortgeschritten", icon: "Gauge" },
    { level: 7, minWins: 351, maxWins: 550, name: "Straßenpilot", class: "Fortgeschritten", icon: "Gauge" },
    { level: 8, minWins: 551, maxWins: 800, name: "Asphaltjäger", class: "Fortgeschritten", icon: "Gauge" },
    { level: 9, minWins: 801, maxWins: 1200, name: "Nitro-Pilot", class: "Fortgeschritten", icon: "Gauge" },
    { level: 10, minWins: 1201, maxWins: 1800, name: "Tuning-Experte", class: "Fortgeschritten", icon: "Gauge" },

    // Klasse 3 (Profi) - Flame
    { level: 11, minWins: 1801, maxWins: 2800, name: "Track Leader", class: "Profi", icon: "Flame" },
    { level: 12, minWins: 2801, maxWins: 4200, name: "Drift Champion", class: "Profi", icon: "Flame" },
    { level: 13, minWins: 4201, maxWins: 6000, name: "Asphalt-König", class: "Profi", icon: "Flame" },
    { level: 14, minWins: 6001, maxWins: 8500, name: "City Racer", class: "Profi", icon: "Flame" },
    { level: 15, minWins: 8501, maxWins: 11000, name: "Speed King", class: "Profi", icon: "Flame" },

    // Klasse 4 (Legende) - Crown
    { level: 16, minWins: 11001, maxWins: 14000, name: "Elitefahrer", class: "Legende", icon: "Crown" },
    { level: 17, minWins: 14001, maxWins: 18000, name: "Race Commander", class: "Legende", icon: "Crown" },
    { level: 18, minWins: 18001, maxWins: 25000, name: "Meisterfahrer", class: "Legende", icon: "Crown" },
    { level: 19, minWins: 25001, maxWins: 40000, name: "Asphalt-Gott", class: "Legende", icon: "Crown" },
    { level: 20, minWins: 40001, maxWins: Infinity, name: "Racing Gott", class: "Legende", icon: "Crown" }
];

class Track {
    constructor(id, cover, title, artist, duration) {
        this.id = id;
        this.cover = cover;
        this.title = title;
        this.artist = artist;
        this.duration = duration;

        playlist.push(this);
    }
}

export const playlist = [];

const t0 = new Track(0, './img/infernos_embrace.jpg', 'Burn in Flames', 'Hellbound Echoes', '3:10');
const t1 = new Track(1, './img/holy_sinner.jpg', 'Holy Sinner', 'Malice Unleashed', '3:14');
const t2 = new Track(2, './img/eternal_nightfall.jpg', 'Kingdom of Ash', 'Vortex of Vengeance', '2:36');
const t3 = new Track(3, './img/beyond_the_veil.jpg', 'Electric Storm', 'Thunderstrike', '2:22');
const t4 = new Track(4, './img/ablaze.jpg', 'Hearts', 'Iron', '3:47');
const t5 = new Track(5, './img/obsidian_horizon.jpg', 'Shattered Night', 'Requiem', '2:49');
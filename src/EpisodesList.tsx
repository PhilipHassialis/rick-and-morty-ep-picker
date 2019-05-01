import React from "react";
import { IEpisode } from "./interfaces";

export default function EpisodesList(props: any): Array<JSX.Element> {
    const { episodes, toggleFavAction, favourites, store } = props;
    const { state, dispatch } = store;

    return episodes.map((episode: IEpisode) => {
        return (
            <section key={episode.id} className="episode-box">
                <img src={episode.image.medium} alt={`${episode.name}`} />
                <div>{episode.name}</div>
                <section style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        Season:{episode.season} {episode.number}
                    </div>
                    <button
                        type="button"
                        onClick={() => toggleFavAction(state, dispatch, episode)}
                    >
                        {/* {state.favourites.includes(episode) ? "Unfav" : "Fav"} */}
                        {favourites.find((fav: IEpisode) => fav.id === episode.id)
                            ? "Unfav"
                            : "Fav"}
                    </button>
                </section>
            </section>
        );
    });
}

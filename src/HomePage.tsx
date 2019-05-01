import React from "react";
import { Store } from "./Store";
import { IEpisode, IAction, IEpisodeProps } from "./interfaces";

const EpisodeList = React.lazy<any>(() => import("./EpisodesList"));

export default function HomePage() {
    const { state, dispatch } = React.useContext(Store);

    const fetchDataAction = async () => {
        const URL =
            "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
        const data = await fetch(URL);
        const dataJSON = await data.json();
        return dispatch({
            type: "FETCH_DATA",
            payload: dataJSON._embedded.episodes
        });
    };

    const toggleFavAction = (episode: IEpisode): IAction => {
        const episodeInFav = state.favourites.includes(episode);
        let dispatchObj = {
            type: "ADD_FAV",
            payload: episode
        };
        if (episodeInFav) {
            const favWithoutEpisode = state.favourites.filter(
                (fav: IEpisode) => fav.id !== episode.id
            );
            dispatchObj = {
                type: "REMOVE_FAV",
                payload: favWithoutEpisode
            };
        }
        return dispatch(dispatchObj);
    };

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction();
    });

    const props: IEpisodeProps = {
        episodes: state.episodes,
        toggleFavAction,
        favourites: state.favourites
    };

    return (
        <React.Fragment>
            <React.Suspense fallback={<div>Loading</div>}>
                <section className="episode-layout">
                    <EpisodeList {...props} />
                </section>
            </React.Suspense>
        </React.Fragment>
    );
}

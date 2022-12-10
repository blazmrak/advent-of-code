import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { states } from "./common.mjs";

export function execute(input) {
    let state = states(input)
    const screen = [[], [], [], [], [], []]

    for (let i = 0; i < 240; i++) {
        const sprite = state[i].x
        const row = Math.floor(i / 40);
        const pos = i % 40

        if (sprite - 1 <= pos && pos <= sprite + 1) screen[row].push('#')
        else screen[row].push('.')
    }

    return screen.map(row => row.join('')).join('\n')
}


if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 10, 1, 'toy')))
}

fetch(
    'https://gateway.reddit.com/desktopapi/v1/set_preferences?redditWebClient=web2x&app=web2x-client-production&allow_over18=1&include=identity',
    {
        headers: {
            Authorization: 'Bearer 1697409587819-sUSj1aw1w6ErCbJ393sEGftjauqyYQ'
        },
        method: 'POST',
        body: JSON.stringify({
            "type": "account",
            "preferences": {
                "open_post_in_new_tab": false,
                "remember_community_sort": false,
                "sort": "hot",
                "styles_enabled": true,
                "use_markdown": false,
                "layout": "card",
                "remember_community_layout": false,
                "has_seen_customize_flyout": false,
                "reduce_animations_from_awards": false,
                "rpan_du_dismissal_time": null,
                "showRpanDu": true,
                "top_content_dismissal_time": null,
                "top_content_times_dismissed": 0,
                "survey_last_seen_time": null,
                "activity_relevant_ads": false,
                "country_code": "SI",
                "bad_comment_autocollapse": "OFF",
                "third_party_data_personalized_ads": false,
                "third_party_site_data_personalized_ads": false,
                "third_party_personalized_ads": false,
                "third_party_site_data_personalized_content": false,
                "show_location_based_recommendations": false
            }
        })
    }
)
    .then(console.log)
    .catch(console.error)


import TimeAgo from "javascript-time-ago";

import localeData from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(localeData);

export const getTimeAgo = (date: Date) => {
    const timeAgo = new TimeAgo("en-US");

    return timeAgo.format(date);
};

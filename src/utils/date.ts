const formatChatsDate = (str?: string) => {
    if (!str) {
        return '';
    }

    const date = new Date(str);
    const dateNow = new Date();
    const day = 24 * 60 * 60 * 1000;
    const week = 7 * day;
    const dateDiff = dateNow.getTime() - date.getTime();

    if (!date) {
        return '';
    }

    if (dateDiff < day) {
        const time = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return time;
    }
    if (dateDiff > day && dateDiff < week) {
        const weekday = date.toLocaleDateString('ru-RU', {
            weekday: 'short',
        });
        return weekday;
    }

    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatTime = (time: string) => {
    const result = new Date(time).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return result || '';
};

export { formatChatsDate, formatTime };

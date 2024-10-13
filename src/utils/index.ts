export const uppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const renderPage = (pageHbs: HandlebarsTemplateDelegate, data: object) => pageHbs(data);


export async function getMetadataImage(data: any) {
    if (data === undefined) { return; }

    let imageData;
    if (data.hasOwnProperty('image')) {
        imageData = data.image;
        if (imageData.startsWith("http")) {
            return imageData;
        }
    }
    if (data.hasOwnProperty('image_data')) {
        imageData = data.image_data;
        // TODO: find out data format to not guess SVG by default.
        return "data:image/svg+xml;base64," + btoa(imageData);
    }
}

export async function getMetadataJson(data: string) {
    if (data.startsWith("data:application/json,")) {
        return JSON.parse(data.replace("data:application/json,", ""));
    }
    if (data.startsWith("data:application/json;base64,")) {
        return JSON.parse(atob(data.replace("data:application/json;base64,", "")));
    }
    if (data.startsWith("http")) {
        return await fetch(data, { cache: 'no-store' }).then(response => response.json());
    }
    return data;
}
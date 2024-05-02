
export const getMetadataImage = (data: any) => {
    if (data === undefined) { return; }

    let image_data;
    if (data.hasOwnProperty('image')) {
        image_data = data.image;
    }
    if (data.hasOwnProperty('image_data')) {
        image_data = data.image_data;
    }
    return image_data;
}
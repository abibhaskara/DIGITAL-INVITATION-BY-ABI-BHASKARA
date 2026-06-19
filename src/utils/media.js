export const getCloudinaryOptimizedUrls = (url) => {
    if (!url?.includes('cloudinary.com')) return { video: url, poster: url };
    const base = url.replace(/\/upload\/(?:.*\/)?(v\d+\/.*)\.\w+$/, '/upload/f_auto/$1');
    const posterBase = url.replace(/\/upload\/(?:.*\/)?(v\d+\/.*)\.\w+$/, '/upload/f_auto,so_0/$1');
    return { video: `${base}.mp4`, poster: `${posterBase}.jpg` };
};

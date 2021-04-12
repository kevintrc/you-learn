const request = require("request");

const searchYt = (term, npt, ppt, callback) => {
    if (npt)
        var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
            term + "&key=AIzaSyDGCbxZvDp5BB5X-zxRlE3Ep0L1R8RhEX0&videoEmbeddable=true&type=video&maxResults=50&pageToken=" + npt;
    else if (ppt)
        var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
            term + "&key=AIzaSyDGCbxZvDp5BB5X-zxRlE3Ep0L1R8RhEX0&videoEmbeddable=true&type=video&maxResults=50&pageToken=" + ppt;
    else var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
        term + "&key=AIzaSyDGCbxZvDp5BB5X-zxRlE3Ep0L1R8RhEX0&videoEmbeddable=true&type=video&maxResults=50";
    try
    {
        request({ url: url, json: true }, (error, { body } = {}) => {
            if (error)
            {
                return callback("Unable to connect to YTApi", undefined);
            } else if (body.items)
            {
                var res = []
                for (i = 0; i < body.items.length; i++)
                {
                    res[i] = {
                        title: body.items[i].snippet.title,
                        imgPath: body.items[i].snippet.thumbnails.medium.url,
                        channelTitle: body.items[i].snippet.channelTitle,
                        ID: body.items[i].id.videoId
                    }
                }
                var npt = body.nextPageToken;
                var ppt = body.prevPageToken;

                return callback(undefined, {
                    data: res,
                    nextPageToken: npt,
                    prevPageToken: ppt,
                });
            } else return callback("Unable to connect to YTApi", undefined);
        }
        );
    } catch (e) { console.log(e); }
};

module.exports = searchYt;

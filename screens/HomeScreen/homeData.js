import { images } from "../../constants";
import PostClick from "./PostClick";

export const homeData = [
    {
        id: 1,
        postImage: images.profile4,
        postUploader: 'naijanews',
        postDate: '12h',
        postContent: "Nigeria React As Clip Showing What Peter Obi's Son Does For A Living in AMerica Surfaces",
        postCommentNum: '160',
        postReaction: '602',
        onPress: PostClick,
    }, {
        id: 2,
        postImage: images.profile2,
        postUploader: 'politicsnigeria',
        postDate: '30m',
        postContent: "JUST IN: 'I won't govern Nigeria from Dubai' - Tinibu hits Atiku again",
        postCommentNum: '200',
        postReaction: '400',
        onPress: PostClick,
    }, {
        id: 3,
        postImage: images.profile3,
        postUploader: 'ProfChrisMolean',
        postDate: '2h',
        postContent: "One million student, farmers to get scholarship, agric loans under Prof. Imumolean's",
        postCommentNum: '80',
        postReaction: '1.5k',
        onPress: PostClick,
    }, {
        id: 4,
        postImage: images.profile4,
        postUploader: 'OfficailReporter',
        postDate: '1h',
        postContent: "Photos As President Buhari Arrives in South Korean For First World Bio Summit",
        postCommentNum: '500',
        postReaction: '200',
        onPress: PostClick,
    }, {
        id: 5,
        postImage: images.image2,
        postUploader: 'sporsinyoruba',
        postDate: '20m',
        postContent: "We are English but also Nigerian - Tammy Abraham and Tomori discuss heritage",
        postCommentNum: '300',
        postReaction: '120',
        onPress: PostClick,
    },
];


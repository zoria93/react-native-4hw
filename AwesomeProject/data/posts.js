export const postsScreenArr = [
  {
    id: 1,
    img: "https://forrest.if.ua/wp-content/uploads/2021/06/slide2-scaled.jpg",
    title: "Ліс",
    location: "Ukraine",
    comments: 8,
    likes: 153,
    coords: {
      latitude: 48.16356661063877,
      longitude: 23.29806148904276,
    },
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1581266399843-9ed61499a5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    title: "Захід на Чорному морі",
    location: "Ukraine",
    comments: 3,
    likes: 200,
    coords: {
      latitude: 48.1630215,
      longitude: 23.2959379,
    },
  },

  {
    id: 3,
    img: "https://images.unsplash.com/photo-1512034796900-7dc9baad088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    title: "Старий будиночок у Венеції",
    location: "Italy",
    comments: 50,
    likes: 200,
    coords: {
      latitude: 48.52731905022333,
      longitude: 22.8705259117282,
    },
  },
  {
    id: 4,
    img: "https://faktypro.com.ua/uploads/img/cikavi-fakti-pro-lisi-i-dereva.jpg",
    title: "Сосновий ліс",
    location: "Ukraine",
    comments: 50,
    likes: 200,
    coords: {
      latitude: 48.5241797,
      longitude: 22.8631192,
    },
  },
];

export const profilePostArr = [
  {
    id: 1,
    img: require("../assets/images/forest.jpg"),
    title: "Ліс",
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require("../assets/images/sunset.jpg"),
    title: "Захід на Чорному морі",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require("../assets/images/oldhouse.jpg"),
    title: "Старий будиночок у Венеції",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];

export const commentPostArr = {
  id: 1,
  postImage: require("../assets/images/sunset.jpg"),
  title: "Sunset on the Black Sea",
  location: "Ukraine",
  comments: 3,
  commentsTexts: [
    {
      id: 1_1,
      date: "09 червня, 2020",
      time: "08:40",
      userAvatar: require("../assets/images/commentsAvatar.jpg"),
      text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    },
    {
      id: 1_2,
      userAvatar: require("../assets/images/commentsAvatarNatali.jpg"),
      date: "09 червня, 2020",
      time: "09:14",
      text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    },
    {
      id: 1_3,
      date: "09 червня, 2020",
      time: "09:20",
      userAvatar: require("../assets/images/commentsAvatar.jpg"),
      text: "Thank you! That was very helpful!",
    },
  ],
};

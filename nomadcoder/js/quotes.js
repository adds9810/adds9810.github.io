const quotes = [
  {
    quote:
      "성공하는 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.",
    author: "톰 모나한",
  },
  {
    quote: "오늘 할 수 있는 일을 내일로 미루지 말라.",
    author: "벤자민 프랭클린",
  },
  {
    quote:
      "위대한 일을 하려고 노력하는 동안에는 아무리 작은 일이라도 소홀히 해서는 안 된다.",
    author: "윌리엄 제임스",
  },
  {
    quote: "어디로 가야 할지 모른다면, 아무 곳에도 도착하지 못할 것이다.",
    author: "루이스 캐럴",
  },
  {
    quote: "작은 성공이 모여 큰 성공을 만든다.",
    author: "나폴레온 힐",
  },
  {
    quote: "포기하지만 않으면, 아직 진 것이 아니다.",
    author: "알버트 아인슈타인",
  },
  {
    quote: "기회는 준비된 자에게만 찾아온다.",
    author: "세네카",
  },
  {
    quote: "당신이 어떤 선택을 하든, 최선을 다하라.",
    author: "마하트마 간디",
  },
  {
    quote: "삶이란 자신을 찾는 것이 아니라, 자신을 만드는 것이다.",
    author: "조지 버나드 쇼",
  },
  {
    quote: "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 믿는 대로 될 것이다.",
    author: "헨리 포드",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

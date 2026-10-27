const projectData = [
  {
    title: "성향 기반 타로 리딩 웹서비스",
    period: "2025.05.",
    contribution: 100,
    description:
      "MBTI 성향과 사용자 질문을 기반으로 Gemini API 리딩을 제공하고, 결과 이미지 저장 · 후기 DB 연동 · GA4 이벤트 추적 기능을 구현한 개인 프로젝트",
    image: "./assets/images/portfolio24.png",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Gemini API"],
    buttons: [
      {
        type: "live",
        label: "🔗 라이브",
        style: "btn-primary",
        url: "https://your-tarot-mbti.vercel.app/",
      },
      {
        type: "code",
        label: "📁 코드",
        style: "btn-outline",
        url: "https://github.com/adds9810/your-tarot-mbti",
      },
    ],
  },
  {
    title: "타로 다이어리 웹앱 개발",
    period: "2025.04. - 05.",
    contribution: 100,
    description:
      "타로 기록 CRUD와 AI 카드 리딩을 제공하는 웹앱으로, Supabase 인증·DB·Storage와 OpenAI API를 연동하고 Framer Motion 인터랙션을 구현한 개인 프로젝트",
    image: "./assets/images/portfolio23.png",
    tags: ["Next.js", "TypeScript", "Supabase", "OpenAI API"],
    buttons: [
      {
        type: "live",
        label: "🔗 라이브",
        style: "btn-primary",
        url: "https://next-tarot-app.vercel.app/",
      },
      {
        type: "code",
        label: "📁 코드",
        style: "btn-outline",
        url: "https://github.com/adds9810/next-tarot-app",
      },
    ],
  },
  {
    title: "LX하우시스 홈페이지 구축",
    period: "2024.04. - 08.",
    contribution: 50,
    description:
      "반응형 홈페이지 구축 프로젝트에서 퍼블리싱을 리드하고, SCSS 기반 스타일 가이드와 공통 UI 구조를 정리하며 일정·산출물 관리를 담당",
    image: "./assets/images/portfolio22.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "jQuery"],
    buttons: [
      {
        type: "live",
        label: "🔗 라이브",
        style: "btn-primary",
        url: "https://www.lxhausys.co.kr/",
      },
    ],
  },
  {
    title: "한국조선해양 SD사업부 홈페이지 구축",
    period: "2023.11. - 2024.01.",
    contribution: 50,
    description:
      "국문·영문 다국어 반응형 웹사이트의 퍼블리싱 구조를 설계하고 작업을 리드했으며, SCSS 기반 스타일 가이드와 인터랙션을 구현",
    image: "./assets/images/portfolio21.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "jQuery"],
    buttons: [
      // {
      //   type: "live",
      //   label: "🔗 라이브",
      //   style: "btn-primary",
      //   url: "https://www.hdksoe-sd.com/ko/main",
      // },
    ],
  },
  {
    title: "신협중앙회 라이프 ON 앱",
    period: "2024.04. - 10.",
    contribution: 50,
    description:
      "Vue.js·Vuetify 기반 금융 앱 웹뷰 UI를 구현하고, 웹 접근성 대응과 공통 컴포넌트 스타일 가이드 제작에 참여",
    image: "./assets/images/portfolio20.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "Vue.js", "Vuetify"],
    buttons: [
      {
        type: "detail",
        label: "📄 상세보기",
        style: "btn-secondary",
        url: "https://play.google.com/store/apps/details?id=kr.co.cu.lifeapp",
      },
    ],
  },
  {
    title: "이스턴웰스 브랜드 사이트 리뉴얼",
    period: "2020.10. - 2021.01.",
    contribution: 70,
    description:
      "반응형 서브 페이지를 구현하고, 백엔드 데이터를 활용한 네이버 지도 API 연동으로 지점 위치 시각화 기능을 개발",
    image: "./assets/images/portfolio14.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "jQuery"],
    buttons: [
      {
        type: "live",
        label: "🔗 라이브",
        style: "btn-primary",
        url: "https://www.easternwells.co.kr/",
      },
    ],
  },
  {
    title: "클라렌 브랜드 사이트 리뉴얼",
    period: "2020.01. - 05.",
    contribution: 60,
    description:
      "Vue.js와 SCSS 기반으로 반응형 UI를 구현하고, 반복 요소를 컴포넌트 단위로 구성해 재사용성과 유지보수성을 높임",
    image: "./assets/images/portfolio13.jpg",
    tags: ["HTML", "SCSS", "JavaScript", "Vue.js"],
    buttons: [
      {
        type: "live",
        label: "🔗 라이브",
        style: "btn-primary",
        url: "https://www.clalen.com/",
      },
    ],
  },
];
/*  
  buttons: [
        {
          type: "live",
          label: "🔗 라이브",
          style: "btn-primary",
          url: "https://example.com",
        },
        {
          type: "code",
          label: "📁 코드",
          style: "btn-outline",
          url: "https://github.com/example",
        },
      {
        type: "detail",
        label: "📄 상세보기",
        style: "btn-secondary",
        url: "https://play.google.com/store/apps/details?id=kr.co.cu.lifeapp",
      },
    ],
*/

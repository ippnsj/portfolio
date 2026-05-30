import type { Project } from "../types";
import { vlpDynamicBottomNavBarShared } from "./shared";

export const vlpDynamicBottomNavBarKo: Project = {
  ...vlpDynamicBottomNavBarShared,
  title: "Vendor Landing Page 동적 하단 네비게이션 바",
  period: "2026년 1월 – 3월",
  role: "아키텍처 설계, 스크롤 연동 하단 바 애니메이션 제안, PoC 설계·구현",
  summary:
    "Vendor Landing Page(VLP)에 도입한 BE 응답 기반 동적 하단 네비게이션 바. 클라이언트 릴리즈 없이 BE만으로 탭 추가·순서 변경·기존 라우트를 탭으로 노출하는 작업까지 모두 처리할 수 있도록 설계.",
  background: {
    content: [
      "Vendor Landing Page(VLP)는 사용자가 vendor를 선택한 뒤 처음 진입하는 화면. 스크롤이 많은 구조라 대부분의 사용자가 카테고리 리스트에 닿으려면 여러 프로모션 섹션을 지나쳐 스크롤해야 했음.",
      "내부 데이터상 카테고리 탐색이 전환율이 가장 높은 사용자 흐름이었음. 그런데 그 진입점이 VLP의 첫 화면 끝보다 아래에 있어 바로 보이지 않는 상태였음.",
      "팀은 카테고리를 하단 바의 탭으로 고정하면 구매까지의 시간을 단축할 수 있고, 같은 하단 바를 미래의 캠페인 탭(예: Ramadan Specials)에도 활용할 수 있을 거라는 가설을 세움.",
    ],
  },
  problem: {
    content: [
      "카테고리 페이지는 Grocery & Retail(G&R) 전체 페이지의 장바구니 담기(ATC) 액션 중 42.80%를 차지하는 — G&R 에서 전환율이 가장 높은 페이지. 그런데 진입점인 VLP의 카테고리 리스트 위젯이 첫 화면 끝 아래에 있어 스크롤해야만 도달 가능했음.",
      "가장 단순한 구현은 탭이 하드코딩된 정적 하단 바였지만, 그러면 새로운 탭(예: 캠페인 탭)을 추가할 때마다 앱 릴리즈가 필요하고, 탭 변경은 모두 표준 릴리즈 사이클을 타야 했음 — 마케팅의 빠른 iteration과 맞지 않음.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/vlp-bottom-nav-bar/ko/before-after-structure.svg",
        alt: "Before와 After 페이지 구조: 카테고리 리스트가 첫 화면 끝 아래에서 하단 바 탭으로 이동",
      },
    ],
  },
  keyDecisions: [
    {
      title: "서버 주도 동적 탭 구성",
      description: [
        "BE 응답이 어떤 탭이 존재할지와 각 탭이 무엇을 렌더링할지를 모두 정의. 각 탭은 두 가지 타입 중 하나:",
        "`embedded_widget`: 위젯으로는 존재하지만 자체 deeplink/route가 없거나 필요 없는 콘텐츠. 별도 route 없이 위젯을 VLP 영역에 바로 embed. FE는 `widget_type → Widget` 매핑을 가지고 있고, BE가 widget_type을 보내면 어떤 위젯을 embed할지 결정됨. 새로운 embedded 타입이 추가되면 매핑 때문에 FE 릴리즈가 여전히 필요. 카테고리 리스트 위젯이 이에 해당 — VLP 안에서만 사용되므로 별도 라우트가 필요 없음.",
        "`route`: 이미 존재하는 라우트로 접근 가능한 콘텐츠(예: deeplink). 기존 라우트를 탭으로 노출 — 탭 클릭 시 VLP는 유지된 채 content 영역만 해당 라우트의 content로 교체됨 (nested routing). 새 위젯 코드, 새 라우트 코드, FE 릴리즈 모두 필요 X — BE가 기존 라우트의 deeplink를 contract에 추가하기만 하면 됨. 카테고리 페이지가 이에 해당 — 이미 deeplink가 있었음.",
        "두 타입을 합치면 기존 콘텐츠의 두 형태를 모두 커버. 그리고 이 contract의 진짜 가치 — FE 릴리즈 없이 탭 추가 — 는 `route` 타입으로 가능.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-bottom-nav-bar/ko/vlp-be-driven-tab-contract.svg",
          alt: "서버 주도 동적 탭 구성: 각 탭이 embedded_widget(FE 매핑된 위젯) 또는 route(기존 deeplink) 중 하나 — BE가 FE 릴리즈 없이 탭 추가·순서 변경 가능",
        },
      ],
    },
    {
      title:
        "스크롤 연동 하단 바: ScrollController 주입 대신 NotificationListener 채택",
      description: [
        "하단 바는 아래로 스크롤 시 숨김, 위로 스크롤 시 노출되도록 설계 — 콘텐츠 영역을 최대화하면서 내비게이션도 잃지 않는 일반적인 패턴.",
        "팀의 초기 제안은 VLP(각 탭의 부모)가 ScrollController를 생성하고 자식 위젯에 주입한 뒤, 스크롤 이벤트를 감지해 하단 바 애니메이션을 제어하는 방식이었음.",
        '두 가지 이유로 반대 의견 제시: 첫째, ScrollController 주입은 각 자식 위젯이 부모로부터 컨트롤러를 받아 연결하도록 설계되어 있어야 하는데, `route` 타입 탭은 그렇게 설계되지 않은 기존 라우트를 재사용하므로 이 패턴 채택 시 모든 라우트에 코드 변경 필요 → contract의 "FE 릴리즈 없음" 약속이 깨짐. 둘째, VLP가 각 탭 내부의 scrollable과 강하게 결합되어, 탭이 스크롤을 다루는 방식이 바뀔 때마다 하단 바 애니메이션이 깨질 위험 있음.',
        "대안으로 부모 레벨에서 NotificationListener를 사용하는 방식 제안. VLP가 페이지를 감싸고, bubble up되는 ScrollNotification을 듣는 구조. 하단 바는 컨트롤러 참조가 아닌 단순한 show/hide 신호만 받음. 두 타입 탭 모두 수정 불필요 — ScrollNotification은 어떤 Scrollable에서든 자연스럽게 bubble up되기 때문.",
        "**성능 우려:** NotificationListener는 기본적으로 overscroll bounce, 가로 스크롤 등 관계없는 이벤트까지 모두 반응함. 하단 바 애니메이션 전에 4개의 가드로 필터링할 것을 제안: ScrollUpdate 이벤트만, 세로 방향만, 유효한 스크롤 범위만, 의미 있는 움직임만(픽셀 임계값 이하 미세 노이즈 제외) 하단 네비게이션 애니메이션 실행.",
        "특히 1번 가드(ScrollUpdate만)와 3번 가드(유효 스크롤 범위만)는 비슷해 보이지만 거르는 케이스가 다름 — 1번은 OverscrollNotification이라는 별도 타입 자체를 제외하고, 3번은 iOS bounce-back 진행 중에 ScrollUpdateNotification으로 들어오면서 pixels가 minScrollExtent/maxScrollExtent 범위를 벗어나는 경우를 제외.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-bottom-nav-bar/ko/scroll-logic.svg",
          alt: "스크롤 연동 하단 바 로직: VLP가 페이지를 NotificationListener로 감싸고, 4개 가드를 거친 뒤 하단 바에 show/hide 신호 전달",
        },
      ],
    },
    {
      title: "Navigator 스코프 처리와 Rider 마이그레이션 동시 진행",
      description: [
        "`route` 타입 탭은 nested routing 방식이라 라우트의 content가 VLP 내부에서 렌더링됨. 이 안에서 띄우는 오버레이(bottom sheet, dialog, snack bar)는 기본적으로 가장 가까운 navigator를 사용하는데, 그게 탭의 nested navigator라서 오버레이가 탭 영역 안에 갇혀버림 — 오버레이 안에서 스크롤하면 하단 바 애니메이션이 잘못 트리거되는 등 의도치 않은 동작 발생. 각 오버레이 호출 지점에서 rootNavigator: true로 명시해 root navigator를 쓰도록 수정이 필요했음.",
        "오버레이 호출 지점 전체를 손봐야 하는 작업인 만큼, 함께 결정할 수 있는 사항이 하나 보였음 — Navigator를 직접 사용하는 패턴 그대로 둘지, Rider로 마이그레이션할지. Rider는 navigator 접근을 중앙화하는 회사 표준 navigation wrapper로, 향후 GoRouter 마이그레이션의 기반이 됨.",
        "이 기회에 Rider 마이그레이션을 함께 하자고 제안. 원래 향후 계획이었고, 같은 호출 지점들을 다시 점검해야 하는 상황이었으니 한 번에 처리해 중복 작업을 피함. 프로젝트 일정에 영향을 주지 않도록, 이번에는 audit 대상이 되는 호출 지점에만 마이그레이션 적용. 프로젝트 종료 후 나머지 화면들도 자발적으로 직접 마무리해, G&R tribe 내비게이션 레이어 전체를 일관되게 정리함.",
      ],
    },
  ],
  result: {
    content: [
      "kill switch와 A/B 테스트를 안전장치로 두고 배포. BE 응답 기반 동적 구성은 설계대로 동작 — 실험 기간 중 BE가 클라이언트 릴리즈 없이 탭 구성을 변경 가능했음.",
      "A/B 테스트 자체는 탭 클릭률이 낮게 나옴 — 이 화면에서는 하단 바 탭 형식이 잘 맞지 않는다는 결과를 도출. 결과가 명확해진 뒤 feature flag를 꺼서 실험 종료 — 사용자 화면은 즉시 원래 VLP로 되돌아감. 코드 변경이나 클라이언트 릴리즈 X.",
      "핵심 학습은 가설 자체에 있었음: 카테고리 진입을 끌어올리는 것만으로는 부족하며 사용자는 여전히 탭 → 리스트 → 카테고리 페이지 진입의 단계를 거침. 오히려 중간 단계 자체를 줄여야 한다는 것을 깨달음.",
      "별도 성과: Rider 마이그레이션으로 G&R 전체 화면에서 navigator 접근 표준화 — 이 기능뿐 아니라 내비게이션 레이어 전체가 일관성을 갖게 됨.",
    ],
    media: [
      {
        type: "video",
        src: "/projects/vlp-bottom-nav-bar/demo.mp4",
        alt: "데모: 카테고리 탭을 누르면 VLP 스크롤 페이지가 카테고리 리스트로 전환되고, 하단 바는 스크롤 다운 시 숨김, 스크롤 업 시 노출",
      },
    ],
  },
};

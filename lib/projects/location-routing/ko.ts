import type { Project } from '../types';
import { locationRoutingShared } from './shared';

export const locationRoutingKo: Project = {
  ...locationRoutingShared,
  title: '위치 미선택으로 인한 딥링크 실패 방지 — 위치 선택 유도 컴포넌트',
  period: '2025년 5월 – 6월',
  role: '컴포넌트 설계 및 구현',
  summary:
    '주간 약 15,000건씩 발생하던 위치 미선택 딥링크 실패를 재사용 가능한 Flutter 컴포넌트로 해결. 에러 페이지를 마주하던 사용자를 적절한 위치 선택 화면으로 라우팅해 정상 흐름으로 복귀시킴.',
  background: {
    content: [
      'Grocery 앱의 많은 페이지가 위치 정보(국가·지역·주소)를 전제로 동작. 사용자가 위치 정보를 설정하지 않은 상태로 딥링크를 통해 진입하면 에러 상태에 빠짐.',
    ],
  },
  problem: {
    content: [
      '딥링크 실패 상위 3가지 카테고리 중 하나가 위치 미선택이었음. 위치 미선택으로 발생하는 총 에러는 주간 약 15,000건.',
      '이 위치 미선택은 다시 3가지 세부 원인으로 나뉨: country 누락, area 누락, 유효하지 않은 area.',
    ],
    media: [
      {
        type: 'image',
        src: '/projects/location-routing/deeplink-error-top-three.png',
        alt: '딥링크 실패 상위 3가지 카테고리: 위치 미선택 에러 강조',
        caption: '딥링크 실패 Top 3 에러',
      },
      {
        type: 'image',
        src: '/projects/location-routing/location-missing-deeplink-errors.png',
        alt: '위치 미선택 에러 3가지: country null, area null',
        caption: '위치 미선택 관련 3가지 에러',
      },
    ],
  },
  keyDecisions: [
    {
      title: '케이스별 라우팅 분리',
      description: [
        'country, area, address 중 어떤 필드가 누락·무효인지 감지하고, 에러 페이지가 아닌 그에 맞는 선택 화면(국가 선택 화면 / 주소 선택 화면 / 지도 화면)으로 라우팅.',
        '선택을 마치면 원래 의도했던 페이지로 자동 복귀.',
      ],
      media: [
        {
          type: 'image',
          src: '/projects/location-routing/ko/validation-flow.svg',
          alt: '위치 검증 플로우 차트: 어떤 필드가 누락되었는지 감지해서 적절한 선택 화면으로 라우팅',
        },
      ],
    },
    {
      title: 'wrapping만으로 적용되는 재사용 컴포넌트',
      description: [
        '별도 패키지의 컴포넌트로 추상화. 위치 정보가 필요한 라우트의 최상위 위젯을 감싸기만 하면 끝, 라우트마다 boilerplate 작성 X.',
        'mode로 검증 범위 선택 가능 (country만 / country + area). 각 팀이 자신의 라우트에 필요한 만큼만 검증 가능.',
        '팀별 feature flag 주입 가능 — 킬 스위치와 A/B 테스팅 flag를 각 팀이 직접 주입해서, 점진 롤아웃·A/B 테스트·즉시 비활성화 모두 자유롭게 가능.',
      ],
    },
  ],
  result: {
    content: [
      '사용자 임팩트: 에러 페이지 대신 적절한 위치 선택 화면으로 안내, 선택 후 원래 의도한 페이지로 자동 복귀.',
      '팀 임팩트: 다른 팀이 동일 컴포넌트를 wrapping만으로 적용해서 위치 미선택 에러를 거의 0까지 감소시킴.',
    ],
    media: [
      {
        type: 'video',
        src: '/projects/location-routing/demo.mp4',
        alt: '데모: 위치 미선택 딥링크 진입 시 위치 선택 플로우 트리거 후 의도한 페이지로 복귀',
        caption: '데모 — 사용자가 지도 화면으로 라우팅되어 위치를 선택한 뒤 의도했던 페이지로 자동 복귀',
      },
      {
        type: 'image',
        src: '/projects/location-routing/result.png',
        alt: '에러 카운트 그래프: 한 달 동안 약 20,000건에서 거의 0으로 감소',
        caption: '컴포넌트 적용 후 위치 미선택 에러가 거의 0으로 감소',
      },
    ],
  },
};

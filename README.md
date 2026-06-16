# cursor-demo

사용자 목록에서 이메일을 추출·검증하는 ES Module 라이브러리입니다. RFC 5322 기반 검증을 제공하며 외부 npm 의존성 없이 동작합니다.

## 사용법

```js
import { isValidEmail, getValidEmails, getUniqueValidEmails } from './src/index.js';

isValidEmail('user@example.com'); // true

getValidEmails([
  { email: 'good@example.com' },
  { email: 'invalid' },
]);
// ['good@example.com']

getUniqueValidEmails([
  { email: 'good@example.com' },
  { email: 'good@example.com' },
  { email: 'also@valid.io' },
]);
// ['good@example.com', 'also@valid.io']
```

## API

| 함수 | 설명 |
|------|------|
| `isValidEmail(email)` | RFC 5322 형식·RFC 3696 길이 제한 검증 |
| `extractEmails(users)` | 사용자 배열에서 `email` 필드 추출 |
| `getValidEmails(users)` | 유효한 이메일만 필터링 |
| `getUniqueValidEmails(users)` | 유효 이메일 추출 후 중복 제거 |

검증 규칙 상세는 [`docs/validator.md`](docs/validator.md)를 참고하세요.

## 테스트

```bash
npm test
```

---

## 릴리스 노트

### v1.0.0 (2026-06-16)

#### 요약

사용자 목록에서 이메일을 추출·검증하는 ES Module 라이브러리의 첫 공개 릴리스입니다. RFC 5322 기반 검증과 중복 제거 API를 제공하며, 외부 npm 의존성 없이 동작합니다.

#### 새 기능

- **`isValidEmail(email)`** — RFC 5322 형식과 RFC 3696 길이 제한(로컬 파트 64자, 전체 254자)을 적용한 이메일 검증
- **`extractEmails(users)`** — 사용자 객체 배열에서 `email` 필드 추출 (배열이 아닌 입력은 빈 배열 반환)
- **`getValidEmails(users)`** — 유효한 이메일만 필터링
- **`getUniqueValidEmails(users)`** — 유효 이메일 추출 후 중복 제거
- **`src/index.js`** — 위 API를 한곳에서 re-export하는 진입점

#### 개선

- IP 도메인 옥텟 검증 시 `00` 같은 잘못된 값을 허용하지 않도록 RFC 5322 정규식 패턴 보완
- 검증 로직을 `validator.js`로 분리해 `email.js`와 관심사 분리

#### 기타

- `docs/validator.md`에 검증 규칙·API 스펙 문서 추가
- Node.js 내장 테스트 러너 기반 단위 테스트 6건 포함 (`npm test`)

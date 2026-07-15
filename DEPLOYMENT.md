# 학교 커뮤니티 배포 가이드 (Railway.app)

이 프로젝트를 Railway.app에 배포하면 컴퓨터를 켜두지 않아도 24/7 온라인으로 서비스를 이용할 수 있습니다.

## 배포 전 준비

### 필수 조건
- GitHub 계정 및 로그인 (이미 완료됨)
- Railway.app 계정 (https://railway.app에서 가입)

## 배포 단계

### 1단계: Railway.app 가입 및 프로젝트 생성

1. https://railway.app에 접속하여 GitHub 계정으로 가입
2. 대시보드에서 **New Project** 클릭
3. **Deploy from GitHub repo** 선택
4. GitHub 저장소 선택: `dam-school-acc/school-community`

### 2단계: 환경 변수 설정

배포 후 Railway 프로젝트 설정에서 다음 환경 변수를 추가하세요:

```
DB_HOST=your-railway-postgres-host
DB_PORT=5432
DB_NAME=school_db
DB_USER=postgres
DB_PASSWORD=your-postgres-password
PORT=5000
NODE_ENV=production
```

### 3단계: PostgreSQL 데이터베이스 연결

#### 방법 1: Railway PostgreSQL 사용 (권장)
1. Railway 대시보드에서 **Add Service** → **Add from Marketplace** → **PostgreSQL** 선택
2. Railway가 자동으로 생성한 환경 변수 사용 (이미 설정됨)
3. Railway 제공 SQL 클라이언트에서 초기 테이블 생성:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  school_code VARCHAR(50) NOT NULL,
  office_code VARCHAR(50),
  grade INT,
  class_number INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  school_name VARCHAR(100) NOT NULL,
  school_code VARCHAR(50) UNIQUE NOT NULL,
  office_code VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  username VARCHAR(100) NOT NULL,
  school_code VARCHAR(50) NOT NULL,
  grade INT,
  class_number INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meals (
  id SERIAL PRIMARY KEY,
  school_code VARCHAR(50) NOT NULL,
  meal_date DATE NOT NULL,
  menu TEXT,
  calories INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  school_code VARCHAR(50) NOT NULL,
  grade INT NOT NULL,
  class_number INT NOT NULL,
  class_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 방법 2: 기존 로컬 PostgreSQL 데이터 동기화
1. 로컬 `school_db`에서 데이터 백업
2. Railway PostgreSQL로 복원 (pg_dump 사용)

### 4단계: 배포 확인

1. Railway 대시보드에서 배포 상태 확인
2. **View Logs** 클릭해서 백엔드 로그 확인
3. 제공된 Railway URL로 접속

```
https://your-project.up.railway.app
```

## 주요 기능 (배포 후)

- ✅ **학교 검색**: 서울, 부산 등으로 검색해서 학교 선택
- ✅ **회원가입**: 학년/반 정보로 가입
- ✅ **반별 게시판**: 로그인 후 자신의 반 공간에서 소통
- ✅ **급식 정보**: 학교별 급식 메뉴 (현재는 더미 데이터)
- ✅ **24/7 서비스**: 컴퓨터를 켜두지 않아도 온라인 유지

## 트러블슈팅

### 백엔드 서버가 시작되지 않는 경우
1. Railway 로그에서 에러 메시지 확인
2. 환경 변수가 모두 설정되었는지 확인
3. `package.json`의 `start` 스크립트 확인

### 데이터베이스 연결 오류
1. DB_HOST, DB_PASSWORD 등 환경 변수 재확인
2. PostgreSQL 서비스가 실행 중인지 확인
3. Railway 대시보드에서 PostgreSQL 서비스 상태 확인

### 프론트엔드에서 API 호출 실패
1. `frontend/index.html`의 `BACKEND_URL` 확인 (현재: `/api`)
2. Railway 배포 시 같은 도메인에서 제공되므로 `/api` 유지
3. 브라우저 개발자 도구(F12) > Network 탭에서 API 요청 확인

## 향후 개선

1. **급식 API 연동**: 한국교육청 급식 API와 실제 연동
2. **이메일 인증**: 회원가입 시 이메일 검증
3. **JWT 토큰**: 더 안전한 인증 메커니즘
4. **파일 업로드**: 게시판에 이미지/파일 첨부
5. **모바일 최적화**: 반응형 디자인 개선

---

**배포 완료 후:** 서버가 항상 켜져 있으므로 `pgAdmin`을 열 필요가 없습니다. 웹 인터페이스를 통해서만 이용하면 됩니다!

# 🏫 학교 커뮤니티 (School Community Platform)

학교 학생들이 안전하게 소통할 수 있는 온라인 플랫폼입니다.
학교 검색 → 가입 → 반별 게시판에서 자유롭게 의견을 나누세요!

## ✨ 주요 기능

### 1. 학교 검색 및 등록
- 🔍 학교 이름으로 검색 (예: "서울" → 서울고등학교 등 자동 추천)
- 📚 학년/반 선택으로 개인 정보 설정
- 🔐 비밀번호 해싱으로 안전한 회원가입

### 2. 반별 게시판
- 💬 같은 반 학생들만 볼 수 있는 전용 게시판
- ✍️ 글 작성 및 댓글 기능
- 👥 학년/반 기반 자동 격리 (프라이버시 보호)

### 3. 학교 급식 정보
- 🍔 오늘의 급식 메뉴 및 칼로리 정보
- 📱 로그인 시 자동 표시
- 🔄 매일 실시간 업데이트 (연동 시)

### 4. 24/7 온라인 서비스
- ☁️ Railway.app 배포로 항상 온라인
- 💻 PC를 켜두지 않아도 이용 가능
- 🌐 어디서나 접속 가능

## 🛠️ 기술 스택

**백엔드:**
- Node.js + Express.js
- PostgreSQL 데이터베이스
- bcrypt 패스워드 해싱

**프론트엔드:**
- 바닐라 JavaScript (React 불필요)
- 반응형 CSS
- REST API 통신

**배포:**
- Railway.app (Node.js + PostgreSQL)

## 🚀 빠른 시작

### 로컬 개발 환경 설정

#### 요구사항
- Node.js 18.x 이상
- PostgreSQL 12+ 
- git

#### 설치

1. **저장소 클론**
   ```bash
   git clone https://github.com/dam-school-acc/school-community.git
   cd school-community
   ```

2. **백엔드 설정**
   ```bash
   cd backend
   npm install
   ```

3. **환경 변수 설정** (`.env` 파일 생성)
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=school_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   ```

4. **데이터베이스 초기화**
   - pgAdmin 또는 터미널에서 SQL 스크립트 실행
   - `backend/sql/init.sql` 참고

5. **서버 시작**
   ```bash
   npm start
   ```
   → http://localhost:5000 에서 접속

### 배포

Railway.app으로 배포하는 자세한 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md) 참고

```bash
# 간단 배포 (Railway CLI 사용)
railway up
```

## 📁 프로젝트 구조

```
school-community/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express 메인 앱
│   │   ├── config/
│   │   │   └── db.js           # PostgreSQL 연결
│   │   ├── controllers/
│   │   │   ├── authController.js    # 인증 로직
│   │   │   ├── postController.js    # 게시글 관리
│   │   │   └── mealController.js    # 급식 정보
│   │   └── routes/
│   │       ├── authRoutes.js        # 인증 라우트
│   │       ├── postRoutes.js        # 게시글 라우트
│   │       └── mealRoutes.js        # 급식 라우트
│   └── package.json
├── frontend/
│   └── index.html               # 프론트엔드 UI
├── DEPLOYMENT.md                # 배포 가이드
└── README.md                    # 이 파일
```

## 🔐 보안 기능

- ✅ 비밀번호 bcrypt 해싱 (10 rounds)
- ✅ SQL Injection 방지 (매개변수화 쿼리)
- ✅ 반별 데이터 격리 (접근 제어)
- ✅ .env 민감 정보 보호 (.gitignore)

## 📝 API 명세

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/schools/search?keyword=서울` - 학교 검색

### 게시판
- `GET /api/posts` - 반별 게시글 조회
- `POST /api/posts` - 글 작성

### 급식
- `GET /api/meal` - 오늘 급식 정보 조회

## 🎯 향후 계획

- [ ] 이메일 인증 시스템
- [ ] JWT 토큰 기반 인증
- [ ] 급식 API 실제 연동 (교육청 데이터)
- [ ] 게시글 수정/삭제 기능
- [ ] 댓글 시스템
- [ ] 이미지 업로드
- [ ] 모바일 앱 (React Native)
- [ ] 선생님 공지사항 기능

## 📞 트러블슈팅

### "Cannot connect to database" 에러
→ PostgreSQL 서버가 실행 중인지 확인, `.env` 설정 재확인

### "CORS 에러"
→ 로컬에서는 `/api` 기반 경로 사용, 배포 후 도메인 재확인

### "학교가 검색되지 않음"
→ 데이터베이스에 학교 데이터가 있는지 확인

## 📄 라이선스

MIT License

## 👥 기여

이슈 및 풀 리퀘스트는 언제든 환영합니다!

---

**Happy Coding! 🎉** 학교 커뮤니티로 학교생활을 더 재미있게 만들어보세요!

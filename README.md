# 🍿FavieList
카카오 클라우드 스쿨에서 진행한 도커 기반의 3-Tire 프로젝트
* 목표 : Front, Back, DB의 멀티 컨테이너로 도커 환경에서 서비스를 운영
* 서비스 주제 : 관심영화 리뷰 사이트
* 서비스 기능 : 영화 검색, 관심 등록, 리뷰 CRUD

<br>

## 💡FavieList 페이지 접속
1. `192.168.56.103:3000` 로 접속합니다.
2. 회원 가입을 위해 `Signup`을 클릭하여 이동합니다.
3. `ID : test`, `Password : 1234`를 입력하여 회원 가입 & 로그인을 진행합니다.
<br>

![image](https://user-images.githubusercontent.com/73453283/204574236-36dff68b-06ee-4b26-a374-3d2a912e7791.png)

<br>
<br>

4. 일간 영화 순위가 1위부터 10위까지 나타납니다.
(영화진흥위원회의 openAPI를 사용함으로 해당 사이트의 문제에 따라 영화순위가 보이지 않을 수 있습니다)
<br>

![image](https://user-images.githubusercontent.com/73453283/204575486-6ee082d7-7c35-4971-9f79-f14aeab758c8.png)
<br>
<br>

5. 검색창을 통해 원하는 영화를 검색할 수도 있습니다.
<br>

![image](https://user-images.githubusercontent.com/73453283/204574357-570ccfcb-195f-48d8-8223-982a51178a13.png)
<br>
<br>

6. Add 버튼을 누르면 [관심 영화 목록]에 추가할 수 있습니다.
* 이미 [관심 영화 목록]에 등록되어 있는 영화에 대해 Add 버튼을 누를 시 아래와 같은 경고창이 출력됩니다.<br>

![image](https://user-images.githubusercontent.com/73453283/204576365-08d5d462-c485-45c5-a370-336fe02c9841.png)
![image](https://user-images.githubusercontent.com/73453283/204576395-e21c094f-9dd4-4e09-8c76-92124e9c19c4.png)

<br>
<br>

7. 메인 페이지의 우상단에 위치한 하트 버튼을 클릭하면 [관심 영화 목록]페이지로 이동할 수 있습니다.
* [관심 영화 목록]으로 등록된 영화들이 나타납니다.

![image](https://user-images.githubusercontent.com/73453283/204574465-41267044-eaf7-407f-a7bc-3d7326f030ca.png)

<br>
<br>

8. 자신의 평점과 코멘트를 작성하고 Reply 버튼을 클릭하면 해당 정보를 저장할 수 있습니다.
* 평점과 코멘트를 새로 입력하요 Reply 버튼을 클릭하면 수정할 수 있습니다.
<br>

![image](https://user-images.githubusercontent.com/73453283/204574553-23de887c-4a86-45bc-9d90-7b245d279ccd.png)
![image](https://user-images.githubusercontent.com/73453283/204577963-9f94258e-b084-4d1d-a43c-633ee44d4f08.png)

<br>
<br>

9. [관심 영화]의 우상단에 위치한 하트 버튼을 클릭하면 관심 목록에서 제거할 수 있습니다.
<br>

![image](https://user-images.githubusercontent.com/73453283/204578117-b57020dc-1678-41ab-901d-19ddb710b80f.png)

<br>
<br>
<br>

## 💡Docker Compose
* compose 파일 생성
```
mkdir compose
```
* docker compose 파일 실행 
  * front-end, back-end, database에 필요한 환경변수 설정
  * front-end, back-end, database가 속할 custom bridge 설정
```
version: "3.8"
services:
  mydb:
    image: mariadb:10.2
    environment:
      - MARIADB_ROOT_PASSWORD=1234
      - MARIADB_DATABASE=movie
    ports:
      - "3306:3306"
    command:
      - --character-set-server=utf8
      - --collation-server=utf8_general_ci
    networks:
      back-net:
  myapp:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      SPRING_DATASOURCE_URL: jdbc:mariadb://mydb:3306/movie?useSSL=false
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 1234
      SERVER_PORT: 8080
      expose: 8080
    depends_on:
      - mydb
    restart: always
    networks:
      - back-net
      - front-net
  myweb:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      API_IP: myapp:8080
    ports:
      - "3000:3000"
    depends_on:
      - myapp
    restart: always
    networks:
      - front-net
networks:
  back-net: {}
  front-net: {}
```

## 💡Docker Image & Docker Network 
### Backend Docker file
```
FROM openjdk:20-ea-11-slim-buster
COPY BoxOffice-0.0.1-SNAPSHOT.jar BoxOffice.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "BoxOffice.jar"]
```

### Front Docker file
```
FROM node:18-alpine3.15
COPY . .
RUN npm -y install
CMD ["npm", "run", "start"]
```
<br>

![image](https://user-images.githubusercontent.com/73453283/204580370-21504754-5d95-4eda-a439-c4afd211190f.png)
![image](https://user-images.githubusercontent.com/73453283/204569943-aae5d6f6-c272-4df4-8a21-a81b81ecf082.png)
![image](https://user-images.githubusercontent.com/73453283/204570069-796b672f-8923-4a39-b34e-f7a3ed2b850f.png)

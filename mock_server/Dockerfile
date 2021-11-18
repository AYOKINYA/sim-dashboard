FROM node:14

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# 서버 실행 시 필요한 파일 복사하고 패키지 다운로드한다.
RUN npm install express cors moment winston winston-daily-rotate-file --silent

COPY ./server.js .
COPY ./constants.js .
COPY ./logger.js .
COPY ./init.sh .

RUN mkdir /usr/src/app/routes
COPY ./routes /usr/src/app/routes/

RUN mkdir /usr/src/app/logs

# 4000포트 오픈하고 node.js 실행
EXPOSE 4000
CMD ["sh", "init.sh"]

# docker build . -t mock_server
# docker run -it -p 4000:4000 mock_server
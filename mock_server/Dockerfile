FROM node:14

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# 서버 실행 시 필요한 패키지 다운 후 server.js 복사
RUN npm install express cors moment --silent
COPY ./server.js .

# 4000포트 오픈하고 node.js 실행
EXPOSE 4000
CMD ["node", "server.js"]

# docker build . -t mock_server
# docker run -it -p 4000:4000 mock_server
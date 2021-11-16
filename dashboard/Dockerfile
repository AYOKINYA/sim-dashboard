FROM node:14 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ./package.json ./package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . .
RUN npm run build

FROM nginx:alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
COPY ./default.conf /etc/nginx/conf.d/

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# 9999포트 오픈하고 nginx 실행
EXPOSE 9999
CMD ["nginx", "-g", "daemon off;"]


# docker build . -t react-app 
# docker run -it -p 3000:9999 react-app
# local에서 쓰는 포트는 3000, nginx http 포트는 9999

# TODO
# SSL 추가해야 한다. openssl? 아니면 회사에서 쓰는 유료 ssl?
# docker-compose 시 
# ecs-client/.env는 yml 파일에서 넣어줘야 한다.
# builder tag 사용 못하면 .sh 파일 만들어서 실행
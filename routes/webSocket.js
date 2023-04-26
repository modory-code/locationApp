const wsModule = require("ws");

module.exports = function(server) {
    // 웹소켓 서버 생성
    const wss = new wsModule.Server({
        server: server, // webSocket 서버에 연결할 HTTP 서버 지정
        // port: 3001 // webSocket 연결에 사용할 port 지정 (생략 시 http 서버와 동일한 port 공유 사용)
    });

    // 클라이언트가 접속했을 때 처리하는 이벤트 메소드를 연결
    wss.on('connection', function(ws, req) {

        // 사용자의 ip 파악
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(ip + "아이피의 클라이언트로부터 접속 요청이 있었습니다.");

        // 메시지를 받은 경우 호출되는 이벤트 메소드입니다.
        ws.on('message', function(message) {
            // 받은 메시지 출력
            console.log(ip + "로부터 받은 메시지 : " + message);

            // 클라이언트에 받은 메시지를 그대로 보내, 통신이 잘되고 있는지 확인합니다.
            ws.send("echo:" + message);
        });
        
        // 오류가 발생한 경우 호출되는 이벤트 메소드입니다.
        ws.on('error', function(error) {
            console.log(ip + "클라이언트와 연결중 오류 발생:" + error);
        });

        // 접속이 종료되면 호출되는 이벤트 메소드입니다.
        ws.on('close', function() {
            console.log(ip + "클라이언트와 접속이 끊어졌습니다.");
        });

    });
}
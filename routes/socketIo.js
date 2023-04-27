const ioModule = require('socket.io');

module.exports = (_server) => {
    // socket.io 서버 생성
    const io = new ioModule.Server(_server, {
        cors: {
            origin: '*'
        }
    });

    // 클라이언트가 접속(연결)했을 때 발생하는 이벤트 메소드 처리
    io.on('connection', (socket, req) => {
        // connection: 클라이언트가 연결할 때 발생
        // disconnect: 클라이언트가 연결 해제 시 발생

        // 연결된 클라이언트 파악
        console.log('클라이언트', socket.id, 'Connected');
        // 서버 연결 여부 클라이언트에게 전송 (통신 여부 체크1)
        socket.emit('클라이언트', socket.id + '연결 되었습니다.');
        
        // 메시지를 받은 경우 호출되는 이벤트 메소드
        socket.on('location', (data) => {
            
            console.time();
            // 받은 메시지 서버 출력
            console.log('클라이언트 메시지:', data);
            console.timeEnd();

            // 받은 메시지 클라이언트에게 전송 (통신 여부 체크2)
            socket.emit('location', data);

        });

        // 오류가 발생한 경우 호출되는 이벤트 메소드
        socket.on('error', (err) => {
            console.log(socket.id + '클라이언트와 연결 중 오류 발생:', err);
        });

        // 접속 종료 시 호출되는 이벤트 메소드
        socket.on('disconnect', (reason) => {
            console.log('클라이언트', socket.id, '연결 종료', reason);
        })
    });
}
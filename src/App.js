import React, {useState} from 'react';
import './App.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}
// fromNow - Возвращает строку относительного времени с настоящего момента.
function DateTimePretty(Component) { // HOC принимаем компонент и создаем компонент. Уневерсальный как для классовых так идли функциональных компонентов   
    return class extends React.Component { 
        render() {
            dayjs.locale('ru');
            dayjs.extend(relativeTime);
            const dateDiff =  dayjs(new Date(this.props.date)).fromNow() // разница между текущим и заданным временем
            return <Component {...this.props} date={dateDiff} />
        }
    }
}

const TimeAgo = DateTimePretty(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <TimeAgo date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-10-14 15:40:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-10-14 18:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-10-08 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <> 
            <VideoList list={list} />
        </>  
    );
}
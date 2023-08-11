const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;

    return (
        <div>
            <p>The current time is: {now.toString()}</p>
            <p>
                {a} + {b} = {a + b}
            </p>
            <p>Hello world</p>
        </div>
    );
};

export default App;

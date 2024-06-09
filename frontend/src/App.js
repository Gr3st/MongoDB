import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form method="POST" action="/contact">
            <div class="input-group justify-content-center">
                <div class="input-group-prepend">
                    <input type="text" name="name" class="form-control" />
                    <input type="text" name="email" class="form-control" />
                    <input type="submit" value="Send" class="btn btn-primary mb-2" />
                </div>
            </div>
        </form>
      </header>
    </div>
  );
}

export default App;

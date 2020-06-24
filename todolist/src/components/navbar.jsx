import React from 'react';

function NavBar(props) {

  return (
    <div>
      <header>
        <nav>
          <ul>
          {props.options.map((option, index) => (
            <li className="nav-item" key={option}>
              <button
                className={`btn${
                  index === props.selected ? '-selected' : '-not-selected' 
                }`}
                onClick={() => props.select(index)}
              >
                {option}
              </button>
            </li>
          ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
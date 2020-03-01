import React, {useEffect} from 'react';
import './Modal.module.css';

export default (props) => {

    useEffect(() => {
        //const elem = document.querySelectorAll('.modal');
        //window.M.Modal.init(elems);
      })

    return(
        <div id="modal1" className="modal">
            <div className="modal-content">
                {props.children}
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    )
}

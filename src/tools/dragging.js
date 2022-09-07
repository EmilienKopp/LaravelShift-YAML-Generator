


/**
 * 
 * @param {event} event mouseDown event
 * @returns {object} {X,Y} set of coordinates for a click inside an element
 */
export const getRelativeXY = (event) => {
    let elemX = event.target.getBoundingClientRect().left;
    let elemY = event.target.getBoundingClientRect().top;
    let X = event.pageX - elemX;
    let Y = event.pageY - elemY;
    return {X,Y};
}


/**
 * Assign to a draggable element's onDragEnd event
 * @param {event} event dragEnd event 
 * @param {object} clickPosition a set of {X,Y} coordinates
 */
export const adjustPosition = (event, clickPosition) => {
    let mouseEndX = event.clientX;
    let mouseEndY = event.clientY;
    let newPositionLeft = mouseEndX - clickPosition.X;
    let newPositionTop = mouseEndY - clickPosition.Y;
    event.target.style.left = newPositionLeft +'px';
    event.target.style.top = newPositionTop + 'px';
}

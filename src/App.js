import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [value, setValue] = useState(0);
  const [list, setList] = useState([]);
  const [num, setNum] = useState(0);
  const [chang, setChange] = useState(false);
  const [show, setShow] = useState([]);

  // if(num<7 && num <= value){
  //   Axios.get("http://localhost:4500/data")
  //   .then(response=>{
  //      let arr = [...response.data];
  //      let count2 =0;
  //      console.log(arr);
  //         for(let i=0; i<arr.length; i++){
  //           if(arr[i].ReserveOrNot === 0){
  //             count2++;
  //           }
  //         }
  //         setValue(count2);
  //      const li= [];       
  //      let store = []; let count = 0;
  //      for(let i=0; i<arr.length; i++){
  //       count++;
  //         if(count%7===0 && count!==0){
  //           store.push(arr[i]);
  //           li.push(store);
  //           store = [];
  //         }else{
  //           store.push(arr[i]);
  //         }
  //          }
  //      li.push(store);
  //      console.log(li);
  //      setList(li);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }
 
useEffect(()=>{

  if(num<=7 && num <= value){
  Axios.get("http://localhost:4500/data")
  .then(response=>{
     let arr = [...response.data];
     let count2 =0;
     console.log(arr);
        for(let i=0; i<arr.length; i++){
          if(arr[i].ReserveOrNot === 0){
            count2++;
          }
        }
        setValue(count2);
     const li= [];       
     let store = []; let count = 0;
     for(let i=0; i<arr.length; i++){
      count++;
        if(count%7===0 && count!==0){
          store.push(arr[i]);
          li.push(store);
          store = [];
        }else{
          store.push(arr[i]);
        }
         }
     li.push(store);
     console.log(li);
     setList(li);
  }).catch(err=>{
    console.log(err);
  })
}
},[chang])
  


    const reserveSet = ()=>{  
// -------------------------count vacent seat in the Row----------------
if(num<7 && num <= value){
let v = -1;
    let bool = false;
      for(let i=0; i<list.length; i++){
        let count= list[i].filter(item=>{
            return item.ReserveOrNot === 0;
        })
        if(count.length >= num){
          bool = true;
           v = i;
           break;
        }
      }
 
      // seat are not available in the Rows.
      if(bool=== false){
       
        let countArray = [];
        let array_seat = [];
        for(let i=0; i<list.length; i++){
          let count= list[i].filter(item=>{
              return item.ReserveOrNot === 0;
          })
          let x = count.length;
          countArray.push(x);
        }
        //find minimum length subArrays where sum of subarrays is greater than or equal to num---------
          let len = countArray.length;
          let start = -1; let end = -1;
        for(let i=0; i<countArray.length; i++){
          let sum = 0;
          for(let j=i; j<countArray.length; j++){
               sum += countArray[j];
               if(sum>=num){
                   let subarrayLength = j-i+1;
                   if(subarrayLength<len){
                    len = subarrayLength;
                       start = i;
                       end = j;
                       break;
                   }
               }
          }
         }
       

// --- now we can book seat from start to end indexes in list.
       let vacentCount =0;
     for(let i=start; i<=end; i++){
        for(let j=0; j<list[i].length; j++){
          if(list[i][j].ReserveOrNot===0 && vacentCount<num){
            array_seat.push(list[i][j].seat);
            vacentCount++;
            Axios.put("http://localhost:4500/data",{
               seat : list[i][j].seat,
               ReserveOrNot : 1
          }).then(response=>{
           
          }).catch(err=>{
            console.log(err);
          })
          
          setChange(!chang);
            
          }
        }
     }
        setShow(array_seat);
      }
// -- Seat are available in the Rows-----
      else if(bool===true)
      {
        let count =0;
        let array_seat = [];
        for(let i=0; i<list[v].length; i++){
          const valueZero = list[v][i].ReserveOrNot;
           if(valueZero===0 && count<num){ 
             array_seat.push(list[v][i].seat);
            count++;
           
              Axios.put("http://localhost:4500/data",{
                 seat : list[v][i].seat,
                 ReserveOrNot : 1
            }).then(response=>{
             
            }).catch(err=>{
              console.log(err);
            });
            setChange(!chang);
          
        }
        setShow(array_seat);
        }
      }
    } 
  }
       
  const restartSeatbooking = ()=>{
    
    for(let i=0; i<list.length; i++){
        let random = Math.floor(Math.random()*(list[i].length));
      for(let j=0; j<list[i].length; j++){
           if(j!==random){
            
            Axios.put("http://localhost:4500/data",{
               seat : list[i][j].seat,
               ReserveOrNot : 0
          }).then(response=>{
           // console.log(response.data);
           
          }).catch(err=>{
            console.log(err);
          })
           }else{
            Axios.put("http://localhost:4500/data",{
               seat : list[i][j].seat,
               ReserveOrNot : 1
          }).then(response=>{
           
          }).catch(err=>{
            console.log(err);
          })
          setChange(!chang);
           }
      }
    }
  }
console.log(list);
  return (
    <div className="App">
      <div> 
      <h3>Number of available seat :- {value}</h3>
      <label>Enter number of seat :-  </label>
     
      <input type="number" max="7" min="1" value={num} onChange={(e)=>setNum(e.target.value)}/>
      <button onClick={()=>reserveSet()}>ReserveSeat</button>
      </div>
      <div className='seatArrag'>
        <table>
          <tbody> 
        {
            list?.map(item=>{
              return(
                <tr> 
               {  item?.map(it=>{
                 let a = it.ReserveOrNot;
                 if(a===0){ 
                  return(
                     <td className='td'>{it.seat}</td>
                      
                      )}else{
                    return (<td className='td2'>{it.seat}</td>)
                  }
            })}</tr>
               
              )
            })
        }</tbody>
        </table>
        
        <div className='show_seat'>
        <>Booking Seat is :- </>
        {
          show?.map(item=>{
            return( 
            <span>{item} -</span>)
          })
        }
        <button onClick={()=>restartSeatbooking()}>New Coach Seat</button></div>
        <br/><br/>
        
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;


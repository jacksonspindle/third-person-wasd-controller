
import React, { Suspense, useState } from 'react'
import Style from './style.css'
import { Canvas } from "@react-three/fiber"
import Character from "./Character"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { RGBA_ASTC_10x10_Format } from 'three'
import { BoxBufferGeometry } from 'three'

export default function App({...props}) {
    const [action, setAction] = useState("idle")
    const [moveForwardBackward, setMoveForwardBackward] = useState(0)
    const [moveRightLeft, setMoveRightLeft] = useState(1.15)
    const [animationForward, toggleAnimationForward] = useState(false)
    const [animationBackward, toggleAnimationBackward] = useState(false)
    const [animationLeft, toggleAnimationLeft] = useState(false)
    const [animationRight, toggleAnimationRight] = useState(false)

  



    document.addEventListener('keydown', (event) => {

        var name = event.key
        var code = event.code

        if (code === "KeyA"){
            setAction("walk")
            toggleAnimationLeft(true)
            
        }
        else if (code === "KeyW"){
            setAction("walk")
            toggleAnimationForward(true)

            // moveforward()
            // setMoveForward(moveForward + .1)
        }
        else if (code === "KeyS"){
            setAction("walk")
            toggleAnimationBackward(true)
        }
        else if (code === "KeyD"){
            setAction("walk")
            toggleAnimationRight(true)
        }

    })

    document.addEventListener('keyup', (event) => {
        var name = event.key
        var code = event.code

        if (code === "KeyA"){
            setAction("idle")
            toggleAnimationLeft(false)
        }
        else if (code === "KeyW"){
            setAction("idle")
            toggleAnimationForward(false)
        }
        else if (code === "KeyS"){
            setAction("idle")
            toggleAnimationBackward(false)
        }
        else if (code === "KeyD"){
            setAction("idle")
            toggleAnimationRight(false)
        }
    })


    return(
        <>
        <div className='controls' >
                <button onClick={() => {setAction("idle")}}>Idle</button>
                <button onClick={() => {setAction("walk")}}>Walk</button>
                <h1>TEST</h1>
                
            </div>
            <Canvas >
          
            <ambientLight/>
            <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.1,0]} >
            <planeBufferGeometry attach="geometry" args={[25, 15]} />
            <meshPhongMaterial attach="material" color="green" />
         </mesh>
            <pointLight intensity={2} position={[-1, 1, 3]}/>
            <pointLight intensity={2} position={[1, 1, 3]}/>
            <pointLight intensity={2} position={[0, 3, -10]}/>
            
                <Suspense>

                    <Character animationForward={animationForward} animationBackward={animationBackward} animationLeft={animationLeft} animationRight={animationRight} action={action} moveForwardBackward={moveForwardBackward} moveRightLeft={moveRightLeft}/>

                    
                    {/* <boxBufferGeometry args={[10,10,10]}></boxBufferGeometry> */}
                </Suspense>
                
                <OrbitControls />
            
            </Canvas>


            


        </>

       
    )
}
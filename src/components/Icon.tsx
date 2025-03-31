import React from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';


interface IconProps {
    name?: string; // Optional name prop for the icon, if needed for rendering
    size?: number; // Optional size prop to define the size of the icon, default can be set in the component if needed
    color?: string; // Optional color prop for the icon, default can be set in the component if needed
    // You can add more props based on the icon library you are using
}

const Icon = ({ name, size = 24, color = "black" }: IconProps) => {
  return (
    <FontAwesome6Icon name={name || "default-icon"} size={size} color={color} />
  )
}

export default Icon
import React from 'react'

const Loader = () => {
    return (
        <div class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
            <div class="w-30 h-30 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

    )
}

export default Loader;
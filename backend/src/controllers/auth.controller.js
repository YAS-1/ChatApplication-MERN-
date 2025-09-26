


export const signup = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error signing up out: ${error}`);
        res.status(500).json({ message: `Error signing up: ${error}` });
    }
}

export const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Login error: ${error}`);
        res.status(500).json({ message: `Login error: ${error}` });       
    }
}


export const logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`Error logging out: ${error}`);
        res.status(500).json({ message: `Error logging out: ${error}` });
    }
}
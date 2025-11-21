// ============================================
// SUPABASE INTEGRATION - FindNBuy Store
// ============================================

class SupabaseClient {
    constructor() {
        this.client = null;
        this.initialized = false;
    }

    // Initialize Supabase client
    async init() {
        if (this.initialized) return;

        try {
            // Check if Supabase credentials are configured
            if (!CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE') {
                console.warn('⚠️ Supabase not configured. Using local storage fallback.');
                this.initialized = false;
                return;
            }

            // Initialize Supabase client (you'll need to include Supabase JS library)
            this.client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
            this.initialized = true;
            console.log('✅ Supabase initialized successfully');
        } catch (error) {
            console.error('❌ Supabase initialization failed:', error);
            this.initialized = false;
        }
    }

    // Check if user is authenticated
    async getCurrentUser() {
        if (!this.initialized) return null;
        
        try {
            const { data: { user } } = await this.client.auth.getUser();
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Sign up new user
    async signUp(email, password, fullName) {
        if (!this.initialized) {
            // Fallback to localStorage
            return this.localSignUp(email, password, fullName);
        }

        try {
            const { data, error } = await this.client.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            // Create user profile in users table
            if (data.user) {
                await this.createUserProfile(data.user.id, fullName, email);
            }

            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign in user
    async signIn(email, password) {
        if (!this.initialized) {
            // Fallback to localStorage
            return this.localSignIn(email, password);
        }

        try {
            const { data, error } = await this.client.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign out user
    async signOut() {
        if (!this.initialized) {
            localStorage.removeItem('findnbuy_user');
            return { success: true };
        }

        try {
            const { error } = await this.client.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Create user profile in database
    async createUserProfile(userId, fullName, email) {
        try {
            const { data, error } = await this.client
                .from('users')
                .insert([
                    {
                        id: userId,
                        full_name: fullName,
                        email: email,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Create profile error:', error);
            return { success: false, error: error.message };
        }
    }

    // Save order to database
    async createOrder(orderData) {
        if (!this.initialized) {
            return this.localSaveOrder(orderData);
        }

        try {
            const { data, error } = await this.client
                .from('orders')
                .insert([orderData]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Create order error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get user orders
    async getUserOrders(userId) {
        if (!this.initialized) {
            return this.localGetOrders(userId);
        }

        try {
            const { data, error } = await this.client
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, orders: data };
        } catch (error) {
            console.error('Get orders error:', error);
            return { success: false, error: error.message };
        }
    }

    // ============================================
    // LOCAL STORAGE FALLBACK (for testing without Supabase)
    // ============================================

    localSignUp(email, password, fullName) {
        const users = JSON.parse(localStorage.getItem('findnbuy_users') || '[]');
        
        // Check if user exists
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'User already exists' };
        }

        const user = {
            id: 'user_' + Date.now(),
            email: email,
            full_name: fullName,
            created_at: new Date().toISOString()
        };

        users.push({ ...user, password }); // In real app, NEVER store passwords in localStorage!
        localStorage.setItem('findnbuy_users', JSON.stringify(users));
        localStorage.setItem('findnbuy_user', JSON.stringify(user));

        return { success: true, user };
    }

    localSignIn(email, password) {
        const users = JSON.parse(localStorage.getItem('findnbuy_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const userData = { ...user };
        delete userData.password;
        localStorage.setItem('findnbuy_user', JSON.stringify(userData));

        return { success: true, user: userData };
    }

    localSaveOrder(orderData) {
        const orders = JSON.parse(localStorage.getItem('findnbuy_orders') || '[]');
        const order = {
            id: 'order_' + Date.now(),
            ...orderData,
            created_at: new Date().toISOString()
        };
        orders.push(order);
        localStorage.setItem('findnbuy_orders', JSON.stringify(orders));
        return { success: true, data: order };
    }

    localGetOrders(userId) {
        const orders = JSON.parse(localStorage.getItem('findnbuy_orders') || '[]');
        const userOrders = orders.filter(o => o.user_id === userId);
        return { success: true, orders: userOrders };
    }
}

// Create global instance
const supabaseClient = new SupabaseClient();
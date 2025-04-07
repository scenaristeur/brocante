import { supabase } from '@/lib/supabaseClient'
const state = () => ({
  user: null,
  session: null,
  myCatalogues: [],
  catalogue: null,
  produit: {},
  produits: [],
  profile: {},
  catalogueOwnerProfile: {},
})

const mutations = {
  setUser(state, u) {
    console.log('user', u)
    state.user = u
    if (u) {
      this.dispatch('broc/getMyProfile')
    }
  },
  setMyCatalogues(state, c) {
    state.myCatalogues = c
  },
  setCatalogue(state, c) {
    state.catalogue = c
  },
  setProduit(state, p) {
    state.produit = p
  },
  setProduits(state, p) {
    state.produits = p
  },
  setProfile(state, p) {
    state.profile = p
  },
  setCatalogueOwnerProfile(state, p) {
    state.catalogueOwnerProfile = p
  },

  // updateDoc(state, newDoc) {
  //   state.doc = newDoc
  //   //render(newDoc)
  // },
}

const actions = {
  async checkUser(context) {
    const { data } = await supabase.auth.getUser()
    context.commit('setUser', data.user)
  },
  async signin(context, signup) {
    const { data, error } = await supabase.auth.signUp({
      email: signup.email,
      password: signup.password,
    })
    console.log(data, error)
    if (error == null) {
      // context.commit('setUser', data.user)
      alert(
        'Inscription réussie, consultez votre boîte mail pour activer votre compte, et cliquez sur le lien de confirmation. (Exepéditeur: "Supabase Auth") ',
      )
    } else {
      console.log(data, error)
      alert(error.message)
    }
  },
  async login(context, signin) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signin.email,
      password: signin.password,
    })
    // this.user = data.user;
    // this.session = data.session;
    if (error == null) {
      context.commit('setUser', data.user)
    } else {
      console.log(data, error)
      alert(error.message)
    }
  },
  async logout(context) {
    const { error } = await supabase.auth.signOut()

    if (error == null) {
      context.commit('setUser', null)
    } else {
      console.log(error)
      alert(error.message)
    }
  },
  async getMyCatalogues(context) {
    const { data, error } = await supabase
      .from('catalogues')
      .select()
      .eq('owner', context.state.user.id)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      context.commit('setMyCatalogues', data)
    }
  },
  async getCatalogue(context, id) {
    const { data, error } = await supabase.from('catalogues').select().eq('id', id)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      context.commit('setCatalogue', data[0])
      context.dispatch('getProduits', data[0].id)
      context.dispatch('getCatalogueOwnerProfile', data[0].owner)
    }
  },
  async enregistrerProduit(context, produit) {
    console.log(produit)
    const { data, error } = await supabase.from('produits').upsert(produit).select()
    console.log(data, error)
    if (error == null) {
      context.commit('setProduit', data[0])
      return data[0]
    } else {
      alert(error.message)
    }
  },
  async getProduits(context, id) {
    const { data, error } = await supabase
      .from('produits')
      .select()
      .eq('catalogue', id)
      .order('updated_at', { ascending: true }, 'created_at', { ascending: true })
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      context.commit('setProduits', data)
    }
  },
  async getProduit(context, id) {
    if (id == null) {
      context.commit('setProduit', { quantite: 1, prix: 1, catalogue: context.state.catalogue.id })
    } else {
      const { data, error } = await supabase.from('produits').select().eq('id', id)
      if (error) {
        console.log(error)
      } else {
        console.log(data)
        context.commit('setProduit', data[0])
      }
    }
  },
  async deleteCatalogue(context, id) {
    const { data, error } = await supabase.from('catalogues').delete().eq('id', id)
    console.log(data, error)
    if (error) {
      console.log(error)
      alert(error.message)
    }
    context.dispatch('getMyCatalogues')
  },
  async updateCatalogue(context, catalogue) {
    const { data, error } = await supabase
      .from('catalogues')
      .update(catalogue)
      .eq('id', catalogue.id)
    console.log(data, error)
    context.dispatch('getMyCatalogues')
  },
  async saveProfile(context, profile) {
    const { data, error } = await supabase.from('profiles').upsert(profile)
    console.log(data, error)
    if (error) {
      console.log(error)
      alert(error.message)
    } else {
      alert('Profil enregistré')
    }
  },
  async getMyProfile(context) {
    const { data, error } = await supabase.from('profiles').select().eq('id', context.state.user.id)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      if (data.length > 0) {
        context.commit('setProfile', data[0])
      }
    }
  },
  async getCatalogueOwnerProfile(context, id) {
    const { data, error } = await supabase.from('profiles').select().eq('id', id)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      if (data.length > 0) {
        context.commit('setCatalogueOwnerProfile', data[0])
      }
    }
  },
  async supprimerProduit(context, produit) {
    const { data, error } = await supabase.from('produits').delete().eq('id', produit.id)
    console.log(data, error)
    context.dispatch('supprimerImages', produit.images)
    context.dispatch('getProduits', context.state.catalogue.id)
  },
  async supprimerImages(images) {
    for (let i = 0; i < images.length; i++) {
      const { data, error } = await supabase.storage.from('produit-images').remove([images[i]])
      console.log(data, error)
    }
  },
  // async checkSession(context) {
  //   localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, window.location.toString())
  //   // console.log("check session", document.location)
  //   // localStorage.setItem(Date.now, document.location)

  //   // sc.onSessionRestore((url) => {
  //   //   history.replaceState(null, '', url)
  //   // })

  //   await sc
  //     .handleIncomingRedirect({
  //       restorePreviousSession: true,
  //     })
  //     .then(async (info) => {
  //       if (info.isLoggedIn == true) {
  //         console.log(`Logged in with WebID [${info.webId}]`)
  //         context.commit('setSession', info)
  //         // let session = sc.getDefaultSession()

  //         // This line is not reached until you are successfully logged in
  //         localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, '')
  //       }
  //     })
  // },
  // async login(context, issuer) {
  //   console.log('login', issuer)
  //   if (!sc.getDefaultSession().info.isLoggedIn) {
  //     await sc.login({
  //       oidcIssuer: issuer,
  //       redirectUrl: window.location.href,
  //       clientName: 'Agent',
  //     })
  //   }
  // },

  // async logout(context) {
  //   let session = sc.getDefaultSession()
  //   await session.logout()
  //   context.commit('setSession', null)
  //   // context.commit('setPod', null)
  //   //store.dispatch('nodes/clearStore')
  // },

  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}

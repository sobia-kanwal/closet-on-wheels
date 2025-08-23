import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return { client, db }
}

// Example function to get products
export async function getProducts(category = null) {
  const { db } = await connectToDatabase()
  const query = category ? { category } : {}
  const products = await db.collection('products').find(query).toArray()
  return products
}

// Example function to add a product
export async function addProduct(product) {
  const { db } = await connectToDatabase()
  const result = await db.collection('products').insertOne(product)
  return result
}
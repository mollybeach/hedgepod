#!/usr/bin/env node

/**
 * Deploy to all supported chains sequentially
 * Uses deployer.ts for comprehensive deployment with logging
 */

const {
    exec
} = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const NETWORKS = [
    'baseSepolia', // Testnet first
    'worldchain',
    'base',
    'celo',
    'polygon',
    'arbitrum',
    'optimism',
    'avalanche',
    'zircuit'
];

async function deployToNetwork(network) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`🚀 Deploying to ${network}...`);
    console.log(`${'='.repeat(70)}\n`);

    try {
        const {
            stdout,
            stderr
        } = await execPromise(
            `npx hardhat run scripts/deploy/deployer.ts --network ${network}`
        );

        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);

        console.log(`\n✅ Successfully deployed to ${network}\n`);
        return true;
    } catch (error) {
        console.error(`\n❌ Error deploying to ${network}:`);
        console.error(error.message);
        return false;
    }
}

async function main() {
    console.log('\n🌍 HedgePod Agent - Multi-Chain Deployment\n');
    console.log(`Deploying to ${NETWORKS.length} networks...\n`);

    const results = {
        successful: [],
        failed: []
    };

    for (const network of NETWORKS) {
        const success = await deployToNetwork(network);
        if (success) {
            results.successful.push(network);
        } else {
            results.failed.push(network);
        }

        // Wait 5 seconds between deployments
        if (network !== NETWORKS[NETWORKS.length - 1]) {
            console.log('⏳ Waiting 5 seconds before next deployment...\n');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    // Print final summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 DEPLOYMENT SUMMARY');
    console.log('='.repeat(70));
    console.log(`\n✅ Successful deployments (${results.successful.length}):`);
    results.successful.forEach(network => console.log(`   - ${network}`));

    if (results.failed.length > 0) {
        console.log(`\n❌ Failed deployments (${results.failed.length}):`);
        results.failed.forEach(network => console.log(`   - ${network}`));
    }

    console.log('\n' + '='.repeat(70));
    console.log(`\n🎉 Deployment process complete!`);
    console.log(`   ${results.successful.length}/${NETWORKS.length} networks deployed successfully\n`);

    process.exit(results.failed.length > 0 ? 1 : 0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
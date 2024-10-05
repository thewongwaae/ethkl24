import { NextResponse, NextRequest } from 'next/server';
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/idkit'; // Ensure this package is installed

export async function POST(request: NextRequest) {
    // Mock data for verification
    const { merkle_root, proof, verification_level, nullifier_hash } = await request.json();
    const action = "verify-user";

    // const data = {
    //     "merkle_root": "0x05ef13d87fbc71b618d65906be465af463bfedff9561282901de2de9f78bc777",
    //     "proof": "0x29aec36cfcf877ae7c0d501b67c0c882cf525bacf5295f9ccddd8b392b4399ed2a1f6efdf22d447447f32b28de675a8657e422688e7a83a38c1ee4335404e5ab0b7493123401cb78a361f4c0c5d0c6be9c1a17eae470cccc2e83c9f45289b9f41cdf2097fe153087c46fb6fb682d89dbdaf333875d9289df12b1aa53488e69e81e8b7788e07586890cd48db7a5992730eba04e8f51ebbfad95d6b2c5bacfc80f12e648ad24dd01ebe633516a50a2dc4fe62cb2074db49437e40be9cbd5eed3642c5836efdcf03e7a9d07be64f3c7b4b5f99b677adb1cfb63daf9519ae049aabd144b69dc20ef8a870993135cb77226f09d8aea68a2540d0b07efbe02fbb32c5f",
    //     "verification_level": "orb",
    //     "action": "verify-user",
    //     "nullifier_hash": "0x022de8edbfa1fbb8148fee9c613079d43c6b8c1a1c6b19ba41b67e79a313054d"
    // };

    const response = await fetch('https://developer.worldcoin.org/api/v2/verify/app_staging_169e21f6afc84b304749830067809632', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({merkle_root, proof, verification_level, nullifier_hash, action }),
    });

    // Parse the JSON response
    const responseData = await response.json();

    // Return the parsed response
    return NextResponse.json(responseData);
}

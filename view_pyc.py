#!/usr/bin/env python3
"""
User-friendly script to view/decompile .pyc files.
Shows both bytecode and attempts to reconstruct source code.
"""
import marshal
import dis
import sys
from pathlib import Path

def view_pyc(pyc_path, output_file=None):
    """View and decompile a .pyc file."""
    pyc_path = Path(pyc_path)
    
    if not pyc_path.exists():
        print(f"❌ Error: File {pyc_path} not found")
        return
    
    output_lines = []
    output_lines.append(f"Decompiling: {pyc_path}\n")
    output_lines.append("=" * 70)
    
    try:
        with open(pyc_path, 'rb') as f:
            # Read header (Python 3.7+ format)
            magic = f.read(4)
            flags = f.read(4)
            timestamp = f.read(4)
            size = f.read(4)
            
            # Read the code object
            code_obj = marshal.load(f)
            
            output_lines.append("\nFILE INFORMATION:")
            output_lines.append("-" * 70)
            output_lines.append(f"Original source: {code_obj.co_filename}")
            output_lines.append(f"Module name: {code_obj.co_name}")
            output_lines.append(f"Magic number: {magic.hex()}")
            output_lines.append(f"Compiled timestamp: {int.from_bytes(timestamp, 'little')}")
            
            output_lines.append("\n" + "=" * 70)
            output_lines.append("BYTECODE DISASSEMBLY:")
            output_lines.append("=" * 70)
            
            # Capture disassembly output
            import io
            from contextlib import redirect_stdout
            f = io.StringIO()
            with redirect_stdout(f):
                dis.dis(code_obj)
            output_lines.append(f.getvalue())
            
            output_lines.append("\n" + "=" * 70)
            output_lines.append("CODE OBJECT DETAILS:")
            output_lines.append("=" * 70)
            output_lines.append(f"Argument count: {code_obj.co_argcount}")
            output_lines.append(f"Kw-only args: {code_obj.co_kwonlyargcount}")
            output_lines.append(f"Local variables: {code_obj.co_varnames}")
            output_lines.append(f"Constants: {code_obj.co_consts}")
            output_lines.append(f"Names: {code_obj.co_names}")
            output_lines.append(f"Free variables: {code_obj.co_freevars}")
            output_lines.append(f"Cell variables: {code_obj.co_cellvars}")
            
            # Try to reconstruct source
            output_lines.append("\n" + "=" * 70)
            output_lines.append("RECONSTRUCTED SOURCE CODE:")
            output_lines.append("=" * 70)
            
            # Simple reconstruction based on bytecode
            if len(code_obj.co_code) <= 4:
                output_lines.append("# This appears to be an empty or minimal module")
                output_lines.append("# The original __init__.py file was likely empty or contained only comments")
                output_lines.append("")
            else:
                output_lines.append("# Source reconstruction from bytecode:")
                # Use uncompyle6 if available for better reconstruction
                try:
                    import uncompyle6
                    import io
                    f = io.StringIO()
                    with open(pyc_path, 'rb') as pyc_file:
                        # Skip header
                        pyc_file.read(16)
                        code_obj = marshal.load(pyc_file)
                    uncompyle6.code_deparse(code_obj, out=f)
                    output_lines.append(f.getvalue())
                except ImportError:
                    output_lines.append("# Install 'uncompyle6' for better source reconstruction:")
                    output_lines.append("#   pip install uncompyle6")
                    output_lines.append("")
                    output_lines.append("# Bytecode suggests this is a minimal/empty module")
                except Exception as e:
                    output_lines.append(f"# Could not fully reconstruct: {e}")
                    output_lines.append("# Bytecode suggests this is a minimal/empty module")
            
    except Exception as e:
        output_lines.append(f"\nError: {e}")
        import traceback
        output_lines.append(traceback.format_exc())
    
    # Print and optionally save
    output_text = "\n".join(output_lines)
    try:
        print(output_text)
    except UnicodeEncodeError:
        # Fallback for Windows console encoding issues
        print(output_text.encode('ascii', 'ignore').decode('ascii'))
    
    if output_file:
        output_path = Path(output_file)
        output_path.write_text(output_text, encoding='utf-8')
        print(f"\nOutput saved to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pyc_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
    else:
        pyc_file = r"c:\Users\nilon\Downloads\Entangle-main\Entangle-main\backend\routes\__pycache__\__init__.cpython-313.pyc"
        output_file = "decompiled_init.py.txt"
    
    view_pyc(pyc_file, output_file)
